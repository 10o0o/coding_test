function solution(k, n, reqs) {
  const typeReqs = new Array(k).fill().map((_) => []);
  const dps = new Array(k).fill().map((_) => new Array(n).fill(null));

  for (const req of reqs) {
    typeReqs[req[2] - 1].push([req[0], req[1]]);
  }

  for (const typeReq of typeReqs) {
    typeReq.sort((a, b) => a[0] - b[0]);
  }

  for (let i = 0; i < k; i += 1) {
    const typeReq = typeReqs[i];
    const dp = dps[i];

    for (let j = 0; j < n; j += 1) {
      const memo = new Array(j + 1).fill(0);
      let result = 0;

      for (const oneTypeReq of typeReq) {
        const [start, spend] = oneTypeReq;

        let min = Infinity;
        let minIndex = null;

        for (let l = 0; l < j + 1; l += 1) {
          const value = memo[l];

          if (value < min) {
            min = value;
            minIndex = l;
          }
        }

        if (min < start) {
          memo[minIndex] = start + spend;
        } else {
          result += min - start;
          memo[minIndex] += spend;
        }
      }

      dp[j] = result;
    }
  }

  let remainTutorCount = n - k;

  const tutorCounts = new Array(k).fill(1);

  while (remainTutorCount) {
    let max = -Infinity;
    let maxIndex = null;

    for (let i = 0; i < k; i += 1) {
      const dp = dps[i];
      const count = tutorCounts[i];
      const calculated = dp[count - 1] - dp[count];

      if (max < calculated) {
        max = calculated;
        maxIndex = i;
      }
    }

    tutorCounts[maxIndex] += 1;
    remainTutorCount -= 1;
  }

  let result = 0;

  for (let i = 0; i < k; i += 1) {
    result += dps[i][tutorCounts[i] - 1];
  }

  return result;
}
