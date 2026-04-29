import express from "express";
import userAuth from "../middleware/auth";

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
    try {
        const user = req.user;
        if (!user) throw new Error("User not found in request.");
        res.send(`${user.firstName} sent a connection request.`);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({
            message: "Unable to fetch profile.",
            error: message,
        });
    }
});

export default requestRouter;
