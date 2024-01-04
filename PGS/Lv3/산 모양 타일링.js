function solution(n, tops) {
  const MOD = 10007;
  const dp = new Array(n + 1).fill().map(() => new Array(2).fill(0));

  dp[0][0] = 1;

  for (let i = 0; i < n; i += 1) {
    if (tops[i]) {
      dp[i + 1][0] = dp[i][0] * 3 + dp[i][1] * 2;
    } else {
      dp[i + 1][0] = dp[i][0] * 2 + dp[i][1] * 1;
    }

    dp[i + 1][1] = dp[i][0] + dp[i][1];

    dp[i + 1][0] %= MOD;
    dp[i + 1][1] %= MOD;
  }

  return (dp[n][0] + dp[n][1]) % MOD;
}