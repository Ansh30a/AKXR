const checkValidData = (email: string, password: string) => {
    // Regex - email validation
    const isEmailValid =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    // Regex - password validation
    const isPasswordValid =
        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/.test(
            password,
        );

    if (!isEmailValid) return `Please enter a valid email address.`;
    if (!isPasswordValid) return `Please enter a valid password.`;

    return null;
};

export default checkValidData;
