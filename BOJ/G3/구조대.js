/* eslint-disable no-lonely-if */
/* eslint-disable no-continue */
/* eslint-disable prefer-destructuring */
const fs = require('fs');

const inputs = fs.readFileSync(process.env.LOGNAME === 'jake' ? './input.txt' : '/dev/stdin')
  .toString().trim().split('\n');

const [n, m] = inputs[0].split(' ').map(Number);
const plays = inputs.slice(1).map((el) => el.split(' ').map(Number));
const bucket = new Map();
const len = 1 + 10 ** 6;
const starts = new Array(len).fill().map(() => []);
const ends = new Array(len).fill().map(() => []);

for (const [s, e, t] of plays) {
  starts[s].push(t);
  ends[e].push(t);
}

let max = 0;
let cur = 0;

const f = (x, ir) => {
  if (ir) {
    const v = bucket.get(x) - 1;

    if (!v) bucket.delete(x);
    else bucket.set(x, v);

    if (v === 1) cur -= 1;
  } else {
    if (!bucket.has(x)) bucket.set(x, 1);
    else {
      const exist = bucket.get(x);
      bucket.set(x, exist + 1);

      if (exist === 1) {
        cur += 1;
        max = Math.max(max, cur);
      }
    }
  }
};

const f2 = (arr, ir) => {
  for (let i = 0; i < arr.length; i += 1) {
    f(arr[i], ir);
  }
};

for (let i = 0; i < m; i += 1) {
  f2(starts[i]);
}

for (let i = m; i < len; i += 1) {
  f2(ends[i - m], 1);
  f2(starts[i]);
}

console.log(max);
