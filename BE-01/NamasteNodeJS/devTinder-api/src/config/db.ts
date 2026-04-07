import mongoose from "mongoose";

const ConnectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(mongoUri);
};

export default ConnectDB;
