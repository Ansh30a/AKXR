import express from "express";
import ConnectDB from "./config/db";
import User from "./models/user.model";
import validateSignUpData from "./utils/validator";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt, { type JwtPayload } from "jsonwebtoken";
import userAuth from "./middleware/auth";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/sign-up", async (req, res) => {
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

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) throw new Error("Invalid credentials.");

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            // JWT
            const token = await jwt.sign(
                { _id: user._id },
                process.env.JWT_SECRET!,
                { expiresIn: "1d" },
            );

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

app.get("/profile", userAuth, async (req, res) => {
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

app.post("/sendConnectionRequest", userAuth, (req, res) => {
    try {
        const user = req.user;
        res.send(`${user.firstName} sent a connection request.`);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({
            message: "Unable to fetch profile.",
            error: message,
        });
    }
});

ConnectDB()
    .then(() => {
        console.log(`MongoDB connected successfully`);

        app.listen(5000, () => {
            console.log(`Server running on 5000.`);
        });
    })
    .catch((err) => {
        console.log(`Error while connecting to MongoDB.`);
        console.error(err);
    });
