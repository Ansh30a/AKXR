interface User {
    readonly dbId: number,  // ---- value can't be changed later
    email: string,
    userId: number,
    googleId?: string,   // ---- doesn't matter if you don't pass its value
    startTrial: () => string,   // ---- 1 way of declaring methods, returns string
    startTrialTwo(): string,    // ---- Another way of declaring methods, also returns string
    getCoupon(couponName: string): (string | number),
};

// const ansh: User = {
//     dbId: 1,
//     email: "a@a.com",
//     userId: 2211,
//     startTrial: () => {
//         return `Trial started`;
//     },
//     startTrialTwo: () => {
//         return `New trial started.`;
//     },
//     getCoupon(couponName: "ansh") {
//         return `Your discount is: ${10}, ${couponName}`;
//     },
// };

// ansh.dbId = 2;  // ---- not possible, readonly

// console.log(ansh.getCoupon("ansh"));



// ++++++++++++++++++++++++ New lecture ++++++++++++++++++++++++ Reopening of an interface

interface User {            // ---- adding more fields to an already declared interface
    githubToken: string
};

const golu: User = {
    dbId: 1,
    email: "a@a.com",
    userId: 2211,
    githubToken: "github",      // ---- added the new field
    startTrial: () => {
        return `Trial started`;
    },
    startTrialTwo: () => {
        return `New trial started.`;
    },
    getCoupon(couponName: "golu") {
        return `Your discount is: ${10}, ${couponName}`;
    },
};

interface Admin extends User {              // ---- inheritance support
    role: "admin" | "ta" | "learner",
};

const bholu: Admin = {          // -- new instance of type Admin
    dbId: 1,
    role: "admin",      // ---- new field added
    email: "a@a.com",
    userId: 2211,
    githubToken: "github",      // ---- added the new field
    startTrial: () => {
        return `Trial started`;
    },
    startTrialTwo: () => {
        return `New trial started.`;
    },
    getCoupon(couponName: "bholu") {
        return `Your discount is: ${10}, ${couponName}`;
    },
};