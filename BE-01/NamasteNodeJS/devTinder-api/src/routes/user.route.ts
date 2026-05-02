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

export default userRouter;
