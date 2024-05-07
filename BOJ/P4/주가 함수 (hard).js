/* eslint-disable no-continue */
/* eslint-disable prefer-destructuring */
const fs = require('fs');

const inputs = fs.readFileSync(process.env.LOGNAME === 'jake' ? './input.txt' : '/dev/stdin')
  .toString().trim().split('\n');

const l = +inputs[0];
const u = inputs[1].split(' ').map((el) => BigInt(el));
let [a, b] = inputs[2].split(' ').map(Number);
b -= 1;

const getPi = (arr) => {
  const pi = new Array(arr.length).fill(0);

  let j = 0;

  for (let i = 1; i < arr.length; i += 1) {
    while (j && (arr[i] !== arr[j])) {
      j = pi[j - 1];
    }

    if (arr[i] === arr[j]) {
      j += 1;
      pi[i] = j;
    }
  }

  return pi;
};

const pi = getPi(u);

let cycle;

for (let i = u.length - 1; i >= 0; i -= 1) {
  if (!(i % 2)) continue;

  const len = (i + 1) / 2;

  if (pi[i] === len) {
    cycle = u.slice(0, len);
    break;
  }
}

const n = cycle.length;
const acc = new Array(n).fill(0n);
acc[0] = cycle[0];

for (let i = 1; i < n; i += 1) {
  acc[i] += acc[i - 1] + cycle[i];
}

let result = 0n;

if (a < 0) {
  const mul = Math.ceil((-a) / n);
  a += n * mul;
  b += n * mul;
}

if (a >= n) {
  const mul = Math.floor(a / n);

  a -= n * mul;
  b -= n * mul;
}

if (a !== 0) {
  result -= acc[a - 1];
  a = 0;
}

const remain = b % n;
const mul2 = BigInt((b - remain) / n);

result += acc[n - 1] * mul2;
result += acc[remain];

console.log(result.toString());
