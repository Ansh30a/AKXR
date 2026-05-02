import express from "express";
import userAuth from "../middleware/auth";
import ConnectionRequest from "../models/connectionRequest.model";
import User from "../models/user.model";

const requestRouter = express.Router();

type SendRequestStatus = "interested" | "ignored";
type ReviewRequestStatus = "accepted" | "rejected";

const isSendRequestStatus = (status: string): status is SendRequestStatus =>
    ["interested", "ignored"].includes(status);

const isReviewRequestStatus = (status: string): status is ReviewRequestStatus =>
    ["accepted", "rejected"].includes(status);



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
            const statusParam = req.params.status;

            const existingToUser = await User.findOne({ _id: toUserId });

            if (!existingToUser) throw new Error("Receiver does not exist");

            if (typeof statusParam !== "string" || !isSendRequestStatus(statusParam))
                return res
                    .status(400)
                    .json({ message: "Invalid status type: " + statusParam });

            const status = statusParam;

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

            let message;
            if (status === "ignored") message = "Ignored Successfully.";
            else message = "Request sent successfully.";

            res.json({ message: message, data });
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

requestRouter.post(
    "/request/review/:status/:requestId",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUser = req.user!;
            const requestId = req.params.requestId;
            const statusParam = req.params.status;

            if (
                typeof statusParam !== "string" ||
                !isReviewRequestStatus(statusParam)
            )
                return res
                    .status(400)
                    .json({ message: "Invalid status type: " + statusParam });

            const status = statusParam;

            const existingRequest = await ConnectionRequest.findOne({
                _id: requestId,
                toUserId: loggedInUser._id,
                status: "interested",
            });

            if (!existingRequest)
                return res.status(404).json({
                    message: "Connection request not found",
                });

            existingRequest.status = status;

            const data = await existingRequest.save();

            res.json({ message: "Connection request " + status, data });
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Unknown error";
            res.status(400).json({
                message: "Unable to process request.",
                error: message,
            });
        }
    },
);

export default requestRouter;
