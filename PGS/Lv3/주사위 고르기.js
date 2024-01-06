function solution(dices) {
  const n = dices.length;
  const compareBitNum = 1 << n;
  const groupSize = n / 2;
  const groups = [];

  const dfs = (group, start) => {
    if (group.length === groupSize) {
      groups.push([...group]);
      return;
    }

    if (start === n) return;

    for (let i = start; i < n; i += 1) {
      group.push(i);
      dfs(group, i + 1);
      group.pop();
    }
  };

  dfs([0], 1);

  const getOppoGroup = (group) => {
    const oppoGroup = [];
    const bitGroup = group.reduce((acc, cur) => acc + (1 << cur), 0);
    const bitOppoGroup = ~compareBitNum ^ bitGroup;

    let compare = 0;

    while (compare < n) {
      if (bitOppoGroup & (1 << compare)) oppoGroup.push(compare);

      compare += 1;
    }

    return oppoGroup;
  };

  const oppoGroups = groups.map(getOppoGroup);

  const getBuckets = (group) => {
    const buckets = [];

    const diceConvertGroup = group.map((el) => dices[el]);
    const n = diceConvertGroup.length;
    const m = diceConvertGroup[0].length;

    const dfs = (curN, curValue) => {
      if (curN === n) {
        buckets.push(curValue);
        return;
      }

      for (let i = 0; i < m; i += 1) {
        dfs(curN + 1, curValue + diceConvertGroup[curN][i]);
      }
    };

    dfs(0, 0);
    buckets.sort((a, b) => a - b);

    return buckets;
  };

  const getDupCountMapAndUnique = (arr) => {
    const map = new Map();
    const unique = [];

    for (let i = 0; i < arr.length; i += 1) {
      if (map.has(arr[i])) {
        map.set(arr[i], map.get(arr[i]) + 1);
      } else {
        map.set(arr[i], 1);
        unique.push(arr[i]);
      }
    }

    return { countMap: map, unique };
  };

  const binaryMinIdxSearch = (left, right, arr, target) => {
    if (left > right) return left;

    const mid = Math.floor((left + right) / 2);
    const value = arr[mid];

    if (value < target) {
      return binaryMinIdxSearch(mid + 1, right, arr, target);
    }

    return binaryMinIdxSearch(left, mid - 1, arr, target);
  };

  let maxWins = -1;
  let result = null;

  for (let i = 0; i < groups.length; i += 1) {
    const groupBucket = getBuckets(groups[i]);
    const oppoGroupBucket = getBuckets(oppoGroups[i]);

    const { countMap: groupDupCountMap, unique: groupUnique } = getDupCountMapAndUnique(groupBucket);

    const { countMap: oppoGroupDupCountMap } = getDupCountMapAndUnique(oppoGroupBucket);

    let [totalWin, totalLose] = [0, 0];

    for (const dice of groupUnique) {
      const multiplyPrefix = groupDupCountMap.get(dice);

      const pin1 = binaryMinIdxSearch(0, oppoGroupBucket.length - 1, oppoGroupBucket, dice);
      const draw = oppoGroupDupCountMap.get(dice) || 0;
      const [win, lose] = [pin1, oppoGroupBucket.length - pin1 - draw];

      totalWin += win * multiplyPrefix;
      totalLose += lose * multiplyPrefix;
    }

    const wins = Math.max(totalWin, totalLose);

    if (wins > maxWins) {
      const winningGroup = totalWin > totalLose ? groups[i] : oppoGroups[i];

      maxWins = wins;
      result = winningGroup;
    }
  }

  return result.map((el) => el + 1);
}