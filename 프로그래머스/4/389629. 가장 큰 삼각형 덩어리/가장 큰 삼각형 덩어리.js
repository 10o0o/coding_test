// 1 >> / , -1 >> \
function solution(grid) {
  const n = grid.length;
  const m = grid[0].length;
  let visCount = -1;
  const visited = new Array(n)
    .fill()
    .map(() => new Array(m).fill().map(() => new Array(2).fill(-1)));

  function getNexts(i, j, k) {
    const nexts = [];
    const flag = grid[i][j];
    if (flag === 1) {
      if (k === 0) {
        if (j !== 0) nexts.push([i, j - 1, 1]);
        if (i !== 0) {
          const aFlag = grid[i - 1][j];
          if (aFlag === 1) nexts.push([i - 1, j, 1]);
          else nexts.push([i - 1, j, 0]);
        }
      } else {
        // k === 1
        if (j !== m - 1) nexts.push([i, j + 1, 0]);
        if (i !== n - 1) {
          const aFlag = grid[i + 1][j];
          if (aFlag === 1) nexts.push([i + 1, j, 0]);
          else nexts.push([i + 1, j, 1]);
        }
      }
    } else {
      // flag === -1
      if (k === 0) {
        if (j !== 0) nexts.push([i, j - 1, 1]);
        if (i !== n - 1) {
          const aFlag = grid[i + 1][j];
          if (aFlag === 1) nexts.push([i + 1, j, 0]);
          else nexts.push([i + 1, j, 1]);
        }
      } else {
        // k === 1
        if (j !== m - 1) nexts.push([i, j + 1, 0]);
        if (i !== 0) {
          const aFlag = grid[i - 1][j];
          if (aFlag === 1) nexts.push([i - 1, j, 1]);
          else nexts.push([i - 1, j, 0]);
        }
      }
    }
    return nexts;
  }

  function calculate(merged, isCycle) {
    if (!merged.length) return 0;
    let limit = merged.length;
    const dupCheckSet = new Set();
    let isDupExist = false;
    for (const el of merged) {
      if (dupCheckSet.has(el)) {
        isDupExist = true;
        break;
      }
      dupCheckSet.add(el);
    }
    if (isDupExist) limit--;

    let ret = 0;
    if (isCycle) {
      const dup = [...merged];
      for (const el of merged) dup.push(el);
      merged = dup;
    }
    let left = 0;
    const memo = new Map();
    let dupCounts = 0;
    const addMemo = el => {
      if (!memo.has(el)) {
        memo.set(el, 1);
        return;
      }
      const v = memo.get(el);
      if (v === 1) dupCounts++;
      memo.set(el, v + 1);
    };
    const checkCondition = () => {
      return dupCounts < 1;
    };
    const removeMemo = el => {
      const v = memo.get(el);
      if (v === 2) dupCounts--;
      if (v === 1) memo.delete(el);
      else memo.set(el, v - 1);
    };

    for (let right = 0; right < merged.length; right++) {
      addMemo(merged[right]);
      while (!checkCondition()) {
        removeMemo(merged[left]);
        left++;
      }
      ret = Math.max(ret, right - left + 1);
    }

    return Math.min(limit, ret);
  }

  function go(i, j, k) {
    const acc = [];
    if (visited[i][j][k] === visCount) return acc;
    const key = i * m + j;
    acc.push(key);
    let queue = [[i, j, k]];
    visited[i][j][k] = visCount;
    while (queue.length) {
      const newQueue = [];
      for (const [x, y, z] of queue) {
        const nexts = getNexts(x, y, z);
        for (const next of nexts) {
          const [nx, ny, nz] = next;
          if (visited[nx][ny][nz] !== visCount) {
            acc.push(nx * m + ny);
            newQueue.push(next);
            visited[nx][ny][nz] = visCount;
          }
        }

        queue = newQueue;
      }
    }
    return acc;
  }

  function check(i, j, k) {
    const nexts = getNexts(i, j, k);
    visited[i][j][k] = ++visCount;
    if (!nexts.length) return 1;
    const results = nexts.map(([x, y, z]) => {
      return go(x, y, z);
    });
    const isCycle = results.length === 2 && results[1].length === 0;
    const merged = results[0];
    merged.reverse();
    merged.push(i * m + j);
    if (results.length === 2) {
      for (const el of results[1]) {
        merged.push(el);
      }
    }

    return calculate(merged, isCycle);
  }

  let res = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      for (let k = 0; k < 2; k++) {
        if (visited[i][j][k] === -1) {
          res = Math.max(res, check(i, j, k));
        }
      }
    }
  }

  return res;
}