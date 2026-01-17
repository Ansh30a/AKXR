const fs = require("fs");

// 1. Read CSV
const csvData = fs.readFileSync("bank_statements.csv", "utf-8");

// 2. Parse CSV
const lines = csvData.trim().split("\n");
const headers = lines[0].split(",");

const transactions = [];

for (let i = 1; i < lines.length; i++) {
  const values = lines[i].split(",");
  const obj = {};

  headers.forEach((header, index) => {
    obj[header] = values[index];
  });

  obj.Amount = Number(obj.Amount);
  transactions.push(obj);
}

// 3. Sort by Date
transactions.sort((a, b) => new Date(a.Date) - new Date(b.Date));

// 4. Analyze
const summaryMap = {};

for (const tx of transactions) {
  const name = tx.AccountHolder;

  if (!summaryMap[name]) {
    summaryMap[name] = {
      AccountHolder: name,
      TotalCredit: 0,
      TotalDebit: 0,
      LargestTransaction: 0,
      SalaryTransactions: []
    };
  }

  if (tx.Type === "Credit") {
    summaryMap[name].TotalCredit += tx.Amount;
  } else {
    summaryMap[name].TotalDebit += tx.Amount;
  }

  if (Math.abs(tx.Amount) > summaryMap[name].LargestTransaction) {
    summaryMap[name].LargestTransaction = Math.abs(tx.Amount);
  }

  if (tx.Remarks.toLowerCase().includes("salary")) {
    summaryMap[name].SalaryTransactions.push(tx.TransactionID);
  }
}

// 5. Save CSV
const summaryArray = Object.values(summaryMap);

let output = "AccountHolder,TotalCredit,TotalDebit,LargestTransaction,SalaryTransactions\n";

summaryArray.forEach(item => {
  output += `${item.AccountHolder},${item.TotalCredit},${item.TotalDebit},${item.LargestTransaction},"${item.SalaryTransactions.join("|")}"\n`;
});

fs.writeFileSync("bank_summary.csv", output);

console.log("\\/ bank_summary.csv created");
