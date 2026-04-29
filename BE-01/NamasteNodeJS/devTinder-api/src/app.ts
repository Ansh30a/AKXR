import express from "express";
import ConnectDB from "./config/db";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import profileRouter from "./routes/profile.route";
import requestRouter from "./routes/request.route";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
