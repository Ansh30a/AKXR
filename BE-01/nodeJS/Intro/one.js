import fs from "fs";

// ---------- Blocking Operation ----------
// const res = fs.readFileSync("contacts.txt", "utf-8");
// console.log(res);

// ---------- Blocking Operation ----------
// console.log(1);
// const res = fs.readFileSync("contacts.txt", "utf-8");
// console.log(res);
// console.log(2);

// ---------- Non-Blocking Operation ----------
// console.log(1);
// const res = fs.readFile("contacts.txt", "utf-8", (err, result) => {
//     console.log(result);
// });
// console.log(res);   // -------- Confusion
// console.log(2);

// Default Thread Pool Size = 4
// Max? - 8core CPU = 8

import os from "os";

console.log(os.cpus().length);
