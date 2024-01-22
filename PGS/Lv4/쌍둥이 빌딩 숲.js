function solution(n, count) {
  const dividedConstant = 1000000007;
  const memo = new Array(count + 1).fill(0);
  memo[1] = 1;

  for (let i = 2; i <= n; i++) {
    const multiplyConstant = 2 * (i - 1);

    for (let j = count; j >= 1; j--) {
      memo[j] = (memo[j - 1] + memo[j] * multiplyConstant) % dividedConstant;
    }
  }
  
  return memo[count];
}