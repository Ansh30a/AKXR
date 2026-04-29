import type { Request } from "express";
import validator from "validator";

const validateSignUpData = (data: any) => {
    const { firstName, lastName, email, password } = data;

    if (!firstName || !lastName) throw new Error("Name not provided.");
    else if (firstName.length < 4 || firstName.length > 50)
        throw new Error("First Name outside permitted length range.");
    else if (!validator.isEmail(email)) throw new Error("Email is not valid");
    else if (!validator.isStrongPassword(password))
        throw new Error("Enter a strong password");
};

const validateProfileEditData = (req: Request) => {
    const { firstName, lastName, age, gender, photoUrl, bio, skills } =
        req.body;

    const allowedEditFields = [
        firstName,
        lastName,
        age,
        gender,
        photoUrl,
        bio,
        skills,
    ];

    const isEditAllowed = Object.keys(req.body).every((field) => {
        allowedEditFields.includes(field);
    });

    return isEditAllowed;
};

export { validateSignUpData, validateProfileEditData };
