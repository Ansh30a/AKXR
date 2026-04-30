import express from "express";
import userAuth from "../middleware/auth";
import ConnectionRequest from "../models/connectionRequest.model";
import User from "../models/user.model";

const requestRouter = express.Router();

// requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
//     try {
//         const user = req.user;
//         if (!user) throw new Error("User not found in request.");
//         res.send(`${user.firstName} sent a connection request.`);
//     } catch (err) {
//         const message = err instanceof Error ? err.message : "Unknown error";
//         res.status(400).json({
//             message: "Unable to fetch profile.",
//             error: message,
//         });
//     }
// });

requestRouter.post(
    "/request/send/:status/:toUserId",
    userAuth,
    async (req, res) => {
        try {
            if (!req.user) throw new Error("User not found in request.");
            const fromUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status: string = req.params.status! as string;

            const existingToUser = await User.findOne({ _id: toUserId });

            if (!existingToUser) throw new Error("Receiver does not exist");

            const allowedStatus = ["interested", "ignored"];

            if (!allowedStatus.includes(status))
                return res
                    .status(400)
                    .json({ message: "Invalid status type: " + status });

            // Check if there is an existing connection request
            const existingConnectionRequest = await ConnectionRequest.findOne({
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId },
                ],
            });

            if (existingConnectionRequest)
                throw new Error("Connection Request already exists.");

            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status,
            });

            const data = await connectionRequest.save();

            res.json({ message: "Request sent successfully.", data });
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Unknown error";
            res.status(400).json({
                message: "Unable to send request.",
                error: message,
            });
        }
    },
);

export default requestRouter;
