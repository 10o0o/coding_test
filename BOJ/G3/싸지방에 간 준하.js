/* eslint-disable prefer-destructuring */
const fs = require('fs');

const [rawN, ...rawInfos] = fs.readFileSync(
  process.env.LOGNAME === 'jake' ? './input.txt' : '/dev/stdin',
).toString().trim().split('\n');

const N = Number(rawN);
const infos = rawInfos.map((el) => el.split(' ').map(Number)).sort((a, b) => a[0] - b[0]);

class UnionFind {
  constructor(size) {
    this.arr = new Array(size);

    for (let i = 0; i < size; i += 1) {
      this.arr[i] = i;
    }
  }

  find(x) {
    if (this.arr[x] === x) return x;

    const value = this.find(this.arr[x]);
    this.arr[x] = value;

    return value;
  }

  union(x, y) {
    if (this.arr[x] !== this.arr[y]) {
      this.arr[y] = this.arr[x];
    }
  }
}

const uf = new UnionFind(N + 1);
const useCounts = [];

const binarySearch = (left, right, target, arr) => {
  if (left > right) return right;

  const mid = Math.floor((left + right) / 2);

  if (arr[mid][0] >= target) {
    return binarySearch(left, mid - 1, target, arr);
  }

  return binarySearch(mid + 1, right, target, arr);
};

for (let i = 0; i < N; i += 1) {
  const prefixedI = uf.find(i);

  if (prefixedI !== N) {
    let totalCount = 1;
    let curTime = infos[prefixedI][1];
    let targetIndex = prefixedI;

    while (true) {
      uf.arr[targetIndex] += 1;
      const newTargetIndex = uf.find(
        binarySearch(targetIndex + 1, N - 1, curTime, infos) + 1,
      );

      if (newTargetIndex === N) break;

      curTime = infos[newTargetIndex][1];
      totalCount += 1;
      targetIndex = newTargetIndex;
    }

    useCounts.push(totalCount);
  }
}

console.log([useCounts.length, useCounts.join(' ')].join('\n'));
