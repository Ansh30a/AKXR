// 1st ---------- find-smallest-number -------------
function findSmallest(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null

  let min = arr[0]

  for (let i = 0; i < arr.length();  i++) {
    if (arr[i] < min) {
      min = arr[i]
    }
  }
  return min
}

module.exports = { findSmallest };

// 2nd ---------- sum-of-all-numbers-in-an-array -------------
function sumArray(arr) {
  if (arr.length === 0) return 0
  let sum = 0
  for (let j = 0; j < arr.length(); j++) {
    sum += arr[j]
  }
}

module.exports = { sumArray };

// 3rd ------------ remove-duplicates-from-array ---------------
function removeDuplicates(arr) {
  const newSet = new Set()
  const res = []

  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item)
      res.push(item)
    }
  }
  return res
}
removeDuplicates([1, 2, 2, 3, 4, 4])
module.exports = removeDuplicates;

// 4th ------------- voting-eligibility --------------
function checkVotingEligibility(age) {
  if (age >= 18) return `Eligible to vote.`
  else return `Not eligible to vote.`
}

module.exports = { checkVotingEligibility };

// 5th ------------- findmaxnumber -------------
function findMaxNumber(arr) {
    if (arr.length === 0) return null

    let max = arr[0]

    for (let i = 0; i < arr.length(); i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    return max
}

findMaxNumber([1, 2, 3, 4, 5]);

module.exports = findMaxNumber

// 6th ------------- factorial-of-a-number ----------------
function factorial(n) {
  if (n === 0) return 1
  return n * factorial(n - 1)
}

module.exports = { factorial };

// 7th ------------- sum-of-n-natural-numbers ---------------
function sumN(n) {
  if (n === 0) return 0
  return n + sumN(n - 1)
}

module.exports = { sumN };

// 8th ------------- fibonacci-series ---------------
function generateFibonacci(n) {
    if (n <= 0) return []
    if (n === 1) return [0]
    if (n === 2) return [0, 1]

    const prev = generateFibonacci(n - 1)
    prev.push(prev[prev.length - 1] + prev[prev.length - 2])
    return prev
}

module.exports = { generateFibonacci };

//  9th -------------- power-of-two -------------------
function isPowerOfTwo(n) {
    if (n <= 0) return false
    return (n & (n - 1)) === 0
}

module.exports = { isPowerOfTwo };

// 10th --------------- power-of-three ------------------
function isPowerOfThree(n) {
    if (n <= 0) return false
    while (n % 3 === 0) {
        n = n / 3
    }
    return n === 1
}
module.exports = { isPowerOfThree };
