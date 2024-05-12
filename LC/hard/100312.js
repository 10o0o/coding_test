// Find the Minimum Cost Array Permutation

/* eslint-disable no-param-reassign */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findPermutation = function (nums) {
  const n = nums.length;
  const memo = new Array(n).fill(0);
  let min = Infinity;
  let result = null;

  const recursive = (oneCase, acc) => {
    if (acc > min) return;

    let flag = 0;

    for (let i = 0; i < n; i += 1) {
      if (!memo[i]) {
        flag = 1;
        memo[i] = 1;
        oneCase.push(i);
        recursive(
          oneCase,
          oneCase.length >= 2
            ? acc + Math.abs(
              oneCase[oneCase.length - 2]
              - nums[oneCase[oneCase.length - 1]],
            )
            : acc,
        );
        memo[i] = 0;
        oneCase.pop();
      }
    }

    if (!flag) {
      acc += Math.abs(oneCase[oneCase.length - 1] - nums[oneCase[0]]);

      if (acc < min) {
        result = [...oneCase];
        min = acc;
      }
    }
  };

  recursive([], 0);

  return result;
};