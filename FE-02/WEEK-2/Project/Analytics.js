const fs = require('fs')

const employees = JSON.parse(fs.readFileSync('./employees.json', 'utf-8'))

const sortedBySalary = [...employees].sort((a, b) => {
    b.salary - a.salary
})

const experiencedEmployees = sortedBySalary.filter(emp => {
    return emp.experience >= 3
})

const summary = experiencedEmployees.map(emp => ({
    name: emp.name,
    department: emp.department,
    bonus: emp.salary * 0.1 * emp.experience
}))

const totalSalaryExpenditure = experiencedEmployees.reduce((total, emp) => {
    total = total + emp.salary
    return total
}, 0)

console.log(`1️⃣   Sorted Employees (by salary descending): `)
console.table(sortedBySalary)

console.log(`\n 2️⃣   Summary List (Experienced Emmployees): `)
console.table(summary)

console.log(`\n 3️⃣   Total Salary Expenditure: ${totalSalaryExpenditure} `)