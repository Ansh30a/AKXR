import express from "express";
import bcrypt from "bcrypt";
import validateSignUpData from "../utils/validator";
import User from "../models/user.model";

const authRouter = express.Router();

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

export default authRouter;
