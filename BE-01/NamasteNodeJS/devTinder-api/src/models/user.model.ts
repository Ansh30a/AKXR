import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        age: {
            type: Number,
            required: true,
            min: 16,
        },
        gender: {
            type: String,
            required: true,
        },
        photoUrl: {
            type: String,
        },
        bio: {
            type: String,
            default: "This is a default Bio",
        },
        skills: {
            type: [String],
        },
    },
    { timestamps: true },
);

const User = model("User", userSchema);

export default User;
