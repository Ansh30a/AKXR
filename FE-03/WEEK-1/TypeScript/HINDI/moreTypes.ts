let response: any = "42";

let numericLength: number = (response as string).length;    // ---- forceful type assertion

type Book = {
    name: string;
};

let bookString = '{"name": "Who moved my cheese?"}';
let bookObject = JSON.parse(bookString) as Book;

console.log(bookObject.name);

const inputElements = document.getElementById("username") as HTMLInputElement;      // ---- type assertion

let value: any;
value = "ansh";
value = [1, 2, 3];
value.toUppercase();    // ---- No error because ANY simply doesn't care and TS doesn't give error becuase you used ANY

let newValue: unknown;
newValue = "ansh";
newValue = [1, 2, 3];
// newValue.toUppercase();    // ---- gives error because UNKNOWN needs you to defines the datatype at some point

if (typeof newValue === "string") {
    newValue.toUpperCase();
}

try {
    
} catch (error) {
    if (error instanceof Error) {   // ---- TypeGuard or Guard check
        console.log(error.message);        
    }
    console.log(`Error: ${error}`);
}

const data: unknown = "ansh";
const newData: string = data as string;     // ---- forceful type assertion

type Role = "admin" | "user";

function redirectBasedOnRole(role: Role): void {
    if (role === "admin") {
        console.log(`Redirecting to admin dashboard`);
        return;
    }
    if (role === "user") {
        console.log(`Redirecting to user dashboard`);
        return;
    }
    role;
};

function neverReturn(): never {
    while (true) {
        
    }
};