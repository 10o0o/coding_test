// Taking Maximum Energy From the Mystic Dungeon

const maximumEnergy = function (energy, k) {
  const memo = new Array(k).fill(null);
  const max = new Array(k).fill(null);

  let index = 0;

  while (energy.length) {
    const popped = energy.pop();

    if (memo[index] === null) {
      memo[index] = popped;
      max[index] = popped;
    } else {
      memo[index] += popped;
      max[index] = Math.max(max[index], memo[index]);
    }

    index += 1;
    index %= k;
  }

  return Math.max(...max.filter((el) => el !== null));
};