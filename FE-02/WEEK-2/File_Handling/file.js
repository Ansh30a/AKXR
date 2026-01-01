const fs = require('fs')

// ==== SYNC ====
// fs.writeFileSync('./test.txt', 'Hello World')

// ==== ASYNC ====
// fs.writeFile('./testNew.txt', 'Not hello world', (err) => {})

// ==== SYNC ====
// const result = fs.readFileSync('./contacts.txt', 'utf-8')
// console.log(result)

// ==== ASYNC ====
// fs.readFile('./contacts.txt', 'utf-8', (err, result) => {
//     if (err) {
//         console.log(`Error: ${err}`)        
//     } else {
//         console.log(result)        
//     }
// })

// ==== SYNC ====
// fs.appendFileSync('./test.txt', ` ${new Date().getDate().toLocaleString()}`)

// fs.cpSync('./test.txt', './copy.txt')

// fs.unlinkSync('./copy.txt')

// console.log(fs.statSync('./test.txt'))

// console.log(fs.statSync('./test.txt').isFile())

// fs.mkdirSync('MyDocs')