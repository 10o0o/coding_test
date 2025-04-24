function solution(target) {
    const dp = new Array(300000).fill(null).map(_ => [Infinity,0]);
    const targetList = new Array(20).fill(null).map((_, idx) => idx + 1);
    
    dp[0][0] = 0;
    
    for (let i = 0; i < target; i++) {
        const check = (addIdx, count) => {
            if (dp[i + addIdx][0] >= dp[i][0] + 1){
                if (dp[i + addIdx][0] === dp[i][0] + 1) {
                	dp[i + addIdx][1] = Math.max(dp[i + addIdx][1], dp[i][1] + count);
                }
                else {
                	dp[i + (addIdx)] = [dp[i][0] + 1, dp[i][1] + count];
                }
            }
        }
        for (const j of targetList) {
            [[1, 1], [2, 0], [3, 0]].forEach(([v, c]) => {
                check(j * v, c);
            });
        }
        
        check(50, 1);
    }
    return dp[target];
}