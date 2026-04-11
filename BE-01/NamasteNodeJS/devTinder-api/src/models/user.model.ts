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
            lowercase: true,
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
            validate(value: string) {
                const genders = [
                    "male",
                    "female",
                    "others",
                    "other",
                    "Male",
                    "Female",
                    "Others",
                    "Other",
                ];
                if (!genders.includes(value))
                    throw new Error(`Gender input is not valid.`);
            },
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
