import express from "express";
import ConnectDB from "./config/db";
import User from "./models/user.model";

const app = express();

app.use(express.json());

app.post("/sign-up", async (req, res) => {
    try {
        const user = new User({
            firstName: "ashley",
            lastName: "k",
            email: "abcde@fghij.com",
            password: "12345678",
            age: 21,
            gender: "female",
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
