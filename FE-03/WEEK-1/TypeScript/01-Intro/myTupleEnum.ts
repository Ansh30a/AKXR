// const user: (string | number)[] = ["ansh", 1];
let user: [string, number, boolean];
// user = ["ansh", 1, true];    // ------ correct order   
user = [1, true, "ansh"];    // ------ incorrect order

let rgb: [number, number, number] = [255, 123, 112];

type User = [number, string];

const newUser: User = [12, "ansh"];

newUser[1] = "Anshu";   // --- this should NOT happen, but it does, big issue

