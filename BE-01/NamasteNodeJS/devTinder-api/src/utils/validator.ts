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

export default validateSignUpData;