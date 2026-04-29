import { Schema, model, type Model, type HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    photoUrl?: string;
    bio: string;
    skills: string[];
}

export interface IUserMethods {
    getJWT(): Promise<string>;
    comparePassword(passwordInputByUser: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;
export type UserDocument = HydratedDocument<IUser, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLenght: 50,
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
            enum: {
                values: [
                    "male",
                    "female",
                    "others",
                    "other",
                    "Male",
                    "Female",
                    "Others",
                    "Other",
                ],
                message: "Gender input is not valid.",
            },
            // validate(value: string) {
            //     const genders = [
            //         "male",
            //         "female",
            //         "others",
            //         "other",
            //         "Male",
            //         "Female",
            //         "Others",
            //         "Other",
            //     ];
            //     if (!genders.includes(value))
            //         throw new Error(`Gender input is not valid.`);
            // },
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
            minLength: 30,
        },
    },
    { timestamps: true },
);

userSchema.methods.getJWT = async function (this: UserDocument) {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
    });
};

userSchema.methods.comparePassword = async function (
    this: UserDocument,
    passwordInputByUser: string,
) {
    return bcrypt.compare(passwordInputByUser, this.password);
};

const User = model<IUser, UserModel>("User", userSchema);

export default User;
