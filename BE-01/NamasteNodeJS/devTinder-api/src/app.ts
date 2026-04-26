import express from "express";
import ConnectDB from "./config/db";
import User from "./models/user.model";
import validateSignUpData from "./utils/validator";
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());

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

        if (isPasswordValid) res.send("User logged in successfully");
        else throw new Error("Invalid credentials.");
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({
            message: "Unable to Log in user",
            error: message,
        });
    }
});

app.get("/fetchUser", async (req, res) => {
    try {
        const userEmail = req.body.email;
        const user = await User.find({ email: userEmail });
        if (user.length === 0) res.status(404).send(`not found`);
        res.send(user);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            message: "Unable to fetch user",
            error: message,
        });
    }
});

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) res.status(404).send(`no users found.`);
        res.send(users);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            message: "Unable to fetch users",
            error: message,
        });
    }
});

app.delete("/user", async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await User.findByIdAndDelete(userId);
        res.send(`user deleted.`);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            message: "Unable to delete user",
            error: message,
        });
    }
});

// app.patch("/user", async (req, res) => {
//     try {
//         const data = req.body;
//         const ALLOWED_UPDATED_FIELDS = [
//             "photoUrl",
//             "about",
//             "gender",
//             "skills",
//         ];
//         const isUpdateAllowed = Object.keys(data).every((k) =>
//             ALLOWED_UPDATED_FIELDS.includes(k),
//         );
//         if (!isUpdateAllowed) throw new Error(`Update not allowed`);
//         const user = await User.findOneAndUpdate(
//             { email: data.email },
//             // { $set: { password: data.password } },
//             data,
//             { runValidators: true },
//         );
//         res.send(`updated successfully.`);
//     } catch (err) {
//         const message = err instanceof Error ? err.message : "Unknown error";
//         res.status(500).json({
//             message: "Unable to update user",
//             error: message,
//         });
//     }
// });

app.patch("/user/:userId", async (req, res) => {
    try {
        const data = req.body;
        const userId = req.params?.userId;
        const ALLOWED_UPDATED_FIELDS = ["photoUrl", "bio", "gender", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATED_FIELDS.includes(k),
        );
        if (!isUpdateAllowed) throw new Error(`Update not allowed`);
        const user = await User.findByIdAndUpdate(
            { _id: userId },
            // { $set: { password: data.password } },
            data,
            { runValidators: true },
        );
        res.send(`updated successfully.`);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            message: "Unable to update user",
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
