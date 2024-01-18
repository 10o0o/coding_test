function solution(n) {
  const DIVIDENUM = 1000000007;
  const dp = new Array(n + 1).fill(null);
  const cache = [8, 0, 2];

  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 3;
  dp[3] = 10;
    
  for (let i = 4; i <= n; i += 1) {
    const remainder = i % 3;
    let sum = cache[remainder];
    const plus = i % 3 === 0 ? 4 : 2;

    sum += dp[i - 1] * 1;
    sum += dp[i - 2] * 2;
    sum += dp[i - 3] * 5;
    sum += plus;
    sum %= DIVIDENUM;

    cache[remainder] += dp[i - 1] * 2;
    cache[remainder] += dp[i - 2] * 2;
    cache[remainder] += dp[i - 3] * 4;
    cache[remainder] %= DIVIDENUM;

    dp[i] = sum;
  }

  return dp[n];
}
