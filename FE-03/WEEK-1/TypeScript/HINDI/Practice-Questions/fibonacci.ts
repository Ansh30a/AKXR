const fib = (num: number): number => {
    if (!Number.isInteger(num) || num < 0) {
        throw new Error("Fibonacci term is only defined for only positive integers");
    }
    if (num === 1 || num === 2) {
        return 1;
    }
    return fib(num - 1) + fib(num - 2);
};

console.log(fib(8));
