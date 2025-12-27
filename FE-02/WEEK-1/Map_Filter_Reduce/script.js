const arr = [1, 2, 3, 4, 5]


// MAP
const output1 = arr.map((num) => {
    return num * 2                 // ---------------- return Doubled array
})

// console.log(output1);


// FILTER
const output2 = arr.filter((num) => {
    return num % 2 != 0                 // ---------------- return odd numbers in the array
})

// console.log(output2)


// REDUCE
const output3 = arr.reduce((acc, curr) => {
    acc = acc + curr
    return acc                 // ---------------- return sum of the array
}, 0)

// console.log(output3);

const output31 = arr.reduce((acc, curr) => {
    if (curr > acc) {
        acc = curr
    }       
    return acc         // ---------------- return max of the array
}, arr[0])

// console.log(output31)


const users = [
    { firstName: 'ansh', lastName: 'k', age: 21 },
    { firstName: 'sahn', lastName: 't', age: 20 },
    { firstName: 'diw', lastName: 'r', age: 22 },
    { firstName: 'jat', lastName: 'g', age: 22 },
    { firstName: 'pra', lastName: 's', age: 21 }
]

// TRICKY MAP
const output4 = users.map((user) => {
    return (user.firstName + ' ' + user.lastName) // ----------- return Full Name
})

// console.log(output4);


// TRICKY REDUCE
const output5 = users.reduce((acc, curr) => {
    if (acc[curr.age]) {
        acc[curr.age]++
    } else {
        acc[curr.age] = 1
    }
    return acc // ---------------------- return number of people in each age group
}, {})

// console.log(output5);


// TRICKY FILTER
const output6 = users.filter((user) => {
    if (user.age < 22) {
        return user
    }
}).map((user) => {
    return user.firstName // ----------- return firstname of people whose age > 22
})

// console.log(output6);


// Achieving same result as above using REDUCE
const output7 = users.reduce((acc, curr) => {
    if (curr.age < 22) {
        acc.push(curr.firstName)
    }
    return acc
}, [])

console.log(output7)
