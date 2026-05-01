import express from "express";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import {
    validateForgotPasswordData,
    validateResetPasswordData,
    validateSignUpData,
} from "../utils/validator";
import User from "../models/user.model";

const authRouter = express.Router();
const PASSWORD_RESET_TOKEN_EXPIRY_IN_MS = 15 * 60 * 1000;

const hashPasswordResetToken = (token: string) => {
    return crypto.createHash("sha256").update(token).digest("hex");
};

const getPasswordResetUrl = (token: string) => {
    const baseUrl = process.env.CLIENT_URL || "http://localhost:5000";

    return `${baseUrl.replace(/\/$/, "")}/reset-password/${token}`;
};

authRouter.post("/sign-up", async (req, res) => {
    try {
        // Data Validation
        validateSignUpData(req.body);

        // Password Encryption
        const { firstName, lastName, email, password, age, gender } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        // Create new User instance
        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            age,
            gender,
        });
        await user.save();

        res.status(201).send(`user added successfully.`);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({
            message: "Unable to sign up user",
            error: message,
        });
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) throw new Error("Invalid credentials.");

        const isPasswordValid = await user.comparePassword(password);

        if (isPasswordValid) {
            // JWT
            const token = await user.getJWT();

            // Add the token to cookie
            res.cookie("token", token, {
                expires: new Date(Date.now() + 24 * 3600000),
            });
            res.send("User logged in successfully");
        } else throw new Error("Invalid credentials.");
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({
            message: "Unable to Log in user",
            error: message,
        });
    }
});

authRouter.post("/forgot-password", async (req, res) => {
    try {
        validateForgotPasswordData(req.body);

        const { email } = req.body;
        const user = await User.findOne({ email }).select(
            "+passwordResetToken +passwordResetTokenExpiresAt",
        );

        const message =
            "If an account exists for this email, a password reset link has been generated.";

        if (!user) {
            res.json({ message });
            return;
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        user.passwordResetToken = hashPasswordResetToken(resetToken);
        user.passwordResetTokenExpiresAt = new Date(
            Date.now() + PASSWORD_RESET_TOKEN_EXPIRY_IN_MS,
        );

        await user.save();

        const resetUrl = getPasswordResetUrl(resetToken);

        if (process.env.NODE_ENV !== "production") {
            console.log(`Password reset link for ${user.email}: ${resetUrl}`);
        }

        res.json({
            message,
            resetUrl:
                process.env.NODE_ENV === "production" ? undefined : resetUrl,
            expiresInMinutes: PASSWORD_RESET_TOKEN_EXPIRY_IN_MS / 60000,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({
            message: "Unable to create password reset link.",
            error: message,
        });
    }
});

authRouter.post("/reset-password/:token", async (req, res) => {
    try {
        validateResetPasswordData(req.body);

        const { token } = req.params;
        if (!token) throw new Error("Reset token is required.");

        const hashedToken = hashPasswordResetToken(token);
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetTokenExpiresAt: { $gt: new Date() },
        }).select("+passwordResetToken +passwordResetTokenExpiresAt");

        if (!user) throw new Error("Password reset token is invalid or expired.");

        const passwordHash = await bcrypt.hash(req.body.password, 10);

        user.password = passwordHash;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiresAt = undefined;

        await user.save();

        res.json({ message: "Password reset successfully." });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({
            message: "Unable to reset password.",
            error: message,
        });
    }
});

authRouter.post("/logout", (_req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("User logged out successfully");
});

export default authRouter;
