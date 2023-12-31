const fs = require('fs');

const args = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
args.pop();

function solution([N, R, S, E]) {
  if (N === BigInt(0)) return BigInt(1);
  if (R === BigInt(0)) return E - S + BigInt(1);

  let mid = BigInt(2) ** (N - BigInt(1));
  let [headEnd, tailStart] = [S - BigInt(1), E + BigInt(1)];
  let [hPrefix, tPrefix] = [-BigInt(1), -BigInt(1)];

  while (R) {
    if (R >= mid) {
      const nextR = R - mid;

      if (!nextR) break;

      if (headEnd >= mid) {
        headEnd -= mid;
        hPrefix *= -BigInt(1);
      }

      if (tailStart >= mid) {
        tailStart -= mid;
        tPrefix *= -BigInt(1);
      }

      R = nextR;
    } else {
      if (headEnd >= mid) {
        headEnd -= mid;
      }

      if (tailStart === mid) {
        tailStart = -BigInt(1);
      } else if (tailStart >= mid) {
        tailStart -= mid;
      }
    }

    mid /= BigInt(2);
    N -= BigInt(1);
  }

  const length = BigInt(2) ** N;

  let sum = BigInt(0);

  if (headEnd >= BigInt(0)) {
    sum += (headEnd + BigInt(1)) * hPrefix;

    if (headEnd >= length / BigInt(2)) {
      sum += (headEnd + BigInt(1) - length / BigInt(2)) * hPrefix * -BigInt(1) * BigInt(2);
    }
  }

  if (tailStart !== -BigInt(1) && tailStart < length) {
    sum += (length - tailStart) * tPrefix * -BigInt(1);

    if (tailStart < length / BigInt(2)) {
      sum += (length / BigInt(2) - tailStart) * tPrefix * BigInt(2);
    }
  }

  return sum;
}

console.log(args.map((arg) => arg.split(' ').map(BigInt)).map(solution).join('\n'));
