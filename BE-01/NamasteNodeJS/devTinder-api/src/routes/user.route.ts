import express from "express";
import userAuth from "../middleware/auth";
import ConnectionRequest from "../models/connectionRequest.model";
import User from "../models/user.model";

const userRouter = express.Router();

const USER_SAFE_DATA = [
    "firstName",
    "lastName",
    "photoUrl",
    "age",
    "gender",
    "skills",
];

// GET all the pending connection requests for the logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user!;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", USER_SAFE_DATA);

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
        const loggedInUser = req.user!;

        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser?._id, status: "accepted" },
                { toUserId: loggedInUser?._id, status: "accepted" },
            ],
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        if (!connections) return res.json({ message: "No connections found." });

        const data = connections.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString())
                return row.toUserId;

            return row.fromUserId;
        });

        res.json({ message: "Connections found.", data });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({
            message: "Unable to fetch the connections.",
            error: message,
        });
    }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user!;

        const allConnectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id },
            ],
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();

        allConnectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const feedUsers = await User.findById({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } },
            ],
        }).select(USER_SAFE_DATA);

        res.send(feedUsers);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({
            message: "Unable to fetch your feed.",
            error: message,
        });
    }
});

export default userRouter;
