const fs = require('fs');

const inputs = fs.readFileSync(0, 'utf8').trim().split('\n');
const t = +inputs[0];
const ans = [];
for (let i = 1; i <= t; i++) {
  const n = BigInt(inputs[i]);
  const a = n + (n % 2n ? (n - 1n) / 2n : n / 2n) * 2n;
  ans.push(a.toString());
}

console.log(ans.join('\n'));
