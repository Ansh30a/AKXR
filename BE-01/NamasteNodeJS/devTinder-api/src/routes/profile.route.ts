import express from "express";
import userAuth from "../middleware/auth";
import { validateProfileEditData } from "../utils/validator";

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

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateProfileEditData(req))
            throw new Error("Invalid edit request");

        const user = req.user;

        Object.keys(req.body).forEach(key) => (user[key] = req.body)
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(401).json({
            message: "Unable to update profile.",
            error: message,
        });
    }
});

export default profileRouter;
