import express from "express";
import cors from "cors";
import ConnectDB from "./config/db";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import profileRouter from "./routes/profile.route";
import requestRouter from "./routes/request.route";
import userRouter from "./routes/user.route";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
