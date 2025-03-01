let calculatedChainLength = (n, memo) => {
  let originalN = n - 1;
  let count = 0;
  while (n > 1 && !memo[n - 1]) {
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
    }
    count++;
  }

  memo[originalN] = count + (memo[n - 1] || 0);
  return memo[originalN];
};

let longestChain = (limit) => {
  let memo = new Array();
  let maxLength = 0;
  let longestChain = 1;

  for (let i = 1; i <= limit; i++) {
    let length = calculatedChainLength(i, memo);
    if (length > maxLength) {
      maxLength = length;
      longestChain = i;
    }
  }

  return { number: longestChain, length: maxLength };
};

const limit = 1000000;
const result = longestChain(limit);
console.log(
  `${result.number}, ${limit}'un altinda ${result.length} terim ile en uzun zinciri olusyuruyor.`
);
