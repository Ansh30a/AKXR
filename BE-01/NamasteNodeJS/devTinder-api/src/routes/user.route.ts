import express from "express";
import userAuth from "../middleware/auth";
import ConnectionRequest from "../models/connectionRequest.model";

const userRouter = express.Router();

// GET all the pending connection requests for the logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user!;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", [
            "firstName",
            "lastName",
            "photoUrl",
            "age",
            "gender",
            "skills",
        ]);

        res.json({
            message: "Requests fetched successfully",
            data: connectionRequests,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({
            message: "Unable to fetch the requests.",
            error: message,
        });
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser?._id, status: "accepted" },
                { toUserId: loggedInUser?._id, status: "accepted" },
            ],
        }).populate("fromUserId", [
            "firstName",
            "lastName",
            "photoUrl",
            "age",
            "gender",
            "skills",
        ]);

        if (!connections) return res.json({ message: "No connections found." });

        const data = connections.map((row) => row.fromUserId);

        res.json({ message: "Connections found.", data });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({
            message: "Unable to fetch the connections.",
            error: message,
        });
    }
});

export default userRouter;
