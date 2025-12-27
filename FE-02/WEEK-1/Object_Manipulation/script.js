const user = {
    name: 'ansh',
    age: 21,
    value: false
}

// console.log(user)

// console.log( "\n")

Object.keys(user).forEach((key) => {
    // console.log(key)    
})

// console.log("\n");

Object.values(user).forEach((value) => {
    // console.log(value)    
})

// console.log("\n");

Object.keys(user).forEach((key) => {
    // console.log(user[key])    
})

Object.entries(user).forEach((entry) => {
    console.log(entry)    
})

let entries = Object.entries(user)
console.log(entries[1][0])