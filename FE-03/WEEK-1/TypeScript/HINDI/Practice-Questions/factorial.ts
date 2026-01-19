const factorial = (num: number): number => {
    if (!Number.isInteger(num) || num < 0) {
        throw new Error("Factorial is only defined for non-negative integers");
    }
    if (num === 0 || num === 1) {
        return 1;
    }
    return num * factorial(num - 1);
};

console.log(factorial(5));