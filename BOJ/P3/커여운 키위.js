const fs = require('fs');

const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const A = input[1].split(' ').map(Number);
const B = input[2].split(' ').map(Number);

class SegmentTree {
  constructor(arr) {
    this.arr = arr;
    this.tree = new Array(arr.length * 4);
    this.build(0, 0, arr.length - 1);
  }

  build(node, left, right) {
    if (left === right) {
      this.tree[node] = this.arr[left];
    } else {
      const mid = Math.floor((left + right) / 2);
      const leftChild = node * 2 + 1;
      const rightChild = node * 2 + 2;
      this.build(leftChild, left, mid);
      this.build(rightChild, mid + 1, right);
      this.tree[node] = Math.max(this.tree[leftChild], this.tree[rightChild]);
    }
  }

  query(node, left, right, queryLeft, queryRight) {
    if (left > queryRight || right < queryLeft) {
      return -Infinity;
    }

    if (left >= queryLeft && right <= queryRight) {
      return this.tree[node];
    }

    const mid = Math.floor((left + right) / 2);
    const leftChild = node * 2 + 1;
    const rightChild = node * 2 + 2;
    const leftValue = this.query(leftChild, left, mid, queryLeft, queryRight);
    const rightValue = this.query(rightChild, mid + 1, right, queryLeft, queryRight);

    return Math.max(leftValue, rightValue);
  }

  update(node, left, right, index, newValue) {
    if (left === right) {
      this.arr[index] = newValue;
      this.tree[node] = newValue;
    } else {
      const mid = Math.floor((left + right) / 2);
      const leftChild = node * 2 + 1;
      const rightChild = node * 2 + 2;

      if (index <= mid) {
        this.update(leftChild, left, mid, index, newValue);
      } else {
        this.update(rightChild, mid + 1, right, index, newValue);
      }

      this.tree[node] = Math.max(this.tree[leftChild], this.tree[rightChild]);
    }
  }
}

if (N < M) {
  console.log(A.reduce((acc, cur) => acc + cur, 0));
} else if (N === M) {
  console.log(A.reduce((acc, cur) => acc + cur, 0) + B[M - 1]);
} else {
  const sum = [...A];

  for (let i = 1; i < N; i += 1) {
    sum[i] += sum[i - 1];
  }

  const dp = new Array(N).fill(-Infinity);
  const treeArr = new Array(N).fill(-Infinity);

  dp[0] = -A[0];
  treeArr[0] = -A[0] - sum[0];

  const MaxSegTree = new SegmentTree(treeArr);

  for (let i = 1; i < N; i += 1) {
    const dpMax = i - M >= 0
      ? MaxSegTree.query(0, 0, N - 1, i - M, i - 1)
      : 0;

    dp[i] = dpMax + sum[i - 1] - A[i];
    MaxSegTree.update(0, 0, N - 1, i, dp[i] - sum[i]);
  }

  let result = sum[M - 1] + B[M - 1];

  for (let i = 0; i < N - M; i += 1) {
    result = Math.max(result, sum[i + M] - sum[i] + dp[i] + B[i + M]);
  }

  for (let i = Math.max(0, N - M); i < N; i += 1) {
    result = Math.max(result, sum[N - 1] - sum[i] + dp[i]);
  }

  console.log(result);
}