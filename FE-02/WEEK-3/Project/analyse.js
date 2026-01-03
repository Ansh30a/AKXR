const fs = require('fs')

// ----- Reading the CSV file
const csvData = fs.readFileSync('./bank_statements.csv', 'utf-8')

// ------- splitting data into lines
const lines = csvData.trim().split('\n')

// ------ Extracting the headers
const headers = lines[0].spilt(',')

// ---------- Converting each row to a single object
const transactions = []

for (let i = 0; i < lines.length; i++) {
    const values = lines[i].split(',')
    const obj = {}

    headers.forEach((header, index) => {
        obj[header] = values[index]
    })

    obj.Amount = Number(obj.Amount)

    transactions.push(obj)
}