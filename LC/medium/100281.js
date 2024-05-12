// Maximum Difference Score in a Grid

/**
 * @param {number[][]} grid
 * @return {number}
 */
const maxScore = function (grid) {
  const n = grid.length;
  const m = grid[0].length;
  const dp = new Array(n).fill().map(() => new Array(m).fill(-Infinity));
  dp[0][0] = 0;

  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      if (i) {
        for (let k = 0; k < i; k += 1) {
          dp[i][j] = Math.max(dp[i][j], Math.max(dp[k][j], 0) + grid[i][j] - grid[k][j]);
        }
      }

      if (j) {
        for (let k = 0; k < j; k += 1) {
          dp[i][j] = Math.max(dp[i][j], Math.max(dp[i][k], 0) + grid[i][j] - grid[i][k]);
        }
      }
    }
  }

  dp[0][0] = -Infinity;

  return Math.max(...dp.flat());
};
