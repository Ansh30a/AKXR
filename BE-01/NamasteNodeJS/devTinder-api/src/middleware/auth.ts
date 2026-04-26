import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    /* 
        1. Read the token from cookies
        2. Validate the token
        3. Find the User
    */
    // ---- Read the token

    try {
        const { token } = req.cookies as { token?: string };
        if (!token) throw new Error("Token is not valid.");

        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET!,
        ) as JwtPayload;

        const { _id } = decodedToken;

        const user = await User.findById(_id);

        if (!user) throw new Error("User not found.");

        req.user = user;
        next();
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return res.status(400).json({
            message: "Auth failed.",
            error: message,
        });
    }
};

export default userAuth;
