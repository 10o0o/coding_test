function calculate(matrix, hidden, n, m, k, isAllEven) {
  const colSum = new Array(m).fill().map(() => new Array(2).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      colSum[j][0] += matrix[i][j];
      colSum[j][1] += hidden[i][j];
    }
  }

  let res = 0;
  for (let i = 0; i < m; i++) {
    res += Math.max(colSum[i][0], colSum[i][1] - k);
  }

  if (isAllEven) {
    let min = Infinity;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if ((i + j) % 2 === 0) continue;
        let val;
        if (colSum[j][0] === colSum[j][1] - k) {
          val = Math.min(matrix[i][j], hidden[i][j]);
        } else if (colSum[j][0] > colSum[j][1] - k) {
          val = matrix[i][j];
        } else {
          val = hidden[i][j];
        }

        min = Math.min(min, val);
      }
    }

    res -= min;
  }

  return res;
}

function solution(visible, hidden, k) {
  const n = visible.length; // 1 ~ 14
  const m = visible[0].length; // 2 ~ 100
  const isAllEven = n % 2 === 0 && m % 2 === 0;

  const cases = 1 << n;
  let res = 0;
  for (let i = 0; i < cases; i++) {
    let cost = 0;
    for (let j = 0; j < n; j++) {
      if (i & (1 << j)) {
        [visible[j], hidden[j]] = [hidden[j], visible[j]];
        cost += k;
      }
    }

    res = Math.max(res, calculate(visible, hidden, n, m, k, isAllEven) - cost);

    for (let j = 0; j < n; j++) {
      if (i & (1 << j)) {
        [visible[j], hidden[j]] = [hidden[j], visible[j]];
      }
    }
  }

  return res;
}
