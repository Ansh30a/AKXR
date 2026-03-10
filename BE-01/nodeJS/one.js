const fs = require("fs");

// ---------- Blocking Operation ----------
// const res = fs.readFileSync("contacts.txt", "utf-8");
// console.log(res);

// ---------- Blocking Operation ----------
// console.log(1);
// const res = fs.readFileSync("contacts.txt", "utf-8");
// console.log(res);
// console.log(2);

// ---------- Non-Blocking Operation ----------
console.log(1);
const res = fs.readFile("contacts.txt", "utf-8", (err, res) => {
    console.log(res);
});
console.log(2);
