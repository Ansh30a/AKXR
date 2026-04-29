import express from "express";
import userAuth from "../middleware/auth";

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;

        res.send(user);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({
            message: "Unable to fetch profile.",
            error: message,
        });
    }
});

export default profileRouter;
