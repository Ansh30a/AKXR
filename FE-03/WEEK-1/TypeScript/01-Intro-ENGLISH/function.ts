function addTwo(num: number) {
    return num + 2;
}

// console.log(addTwo(5));

function getUpper(val: string) {
    return val.toUpperCase();
}

// console.log(getUpper('anshuman'));

function signUpUser(name: string, email: string, password: string, isPaid: boolean) {
    console.log(name);      
    return {name, email, isPaid};
}

// console.log(signUpUser('Ansh', 'abcd@efgh.com', '1234', true));

const loginUser = (name: string, email: string, isPaid: boolean = false) => {
    return {name, email, isPaid};
}

// console.log(loginUser('Ansh', 'anshu@anshu', true));

// --------------- RETURN TYPE ---------------
function addTwoNum(num: number): number { //------------------ specifying return type
    // return 'hello';
    return num + 2;
}

// function getValue(myVal: number) {
//     if (myVal > 5) return true; ------------------------- SPECIAL CASE with 2 return types
//     return '200';
// }

const getHello = (s: string): string => {
    return s;
}

// const heroes = ['thor', 'ironaman', 'spiderman'];
const heroes = [1, 2, 3]

const hero = heroes.map((hero): string => {
    return `Hero's name is ${hero}`;
})

// console.log(hero);

function consoleError(err: string): void {
    console.log(err);    
}
function handleError(err: string): never {
    throw new Error(err);
}

// console.log(handleError('404'));

handleError('404');

