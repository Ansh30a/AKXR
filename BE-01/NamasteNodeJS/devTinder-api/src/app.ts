import express from "express";
import cors from "cors";
import ConnectDB from "./config/db";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import profileRouter from "./routes/profile.route";
import requestRouter from "./routes/request.route";
import userRouter from "./routes/user.route";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

const frontendUrl = process.env.FRONTEND_URL?.replace(/\/+$/, "");

const corsOptions = {
    origin: frontendUrl,
    credentials: true,
};

app.use(cors(corsOptions));

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

ConnectDB()
    .then(() => {
        console.log(`MongoDB connected successfully`);

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}.`);
        });
    })
    .catch((err) => {
        console.log(`Error while connecting to MongoDB.`);
        console.error(err);
    });
