// Permutation Difference between Two Strings

const findPermutationDifference = function (s, t) {
  const cache = new Map();

  for (let i = 0; i < s.length; i += 1) {
    cache.set(s[i], i);
  }

  let result = 0;

  for (let i = 0; i < t.length; i += 1) {
    result += Math.abs(i - cache.get(t[i]));
  }

  return result;
};