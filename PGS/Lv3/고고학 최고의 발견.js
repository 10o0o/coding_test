function solution(clockHands) {
  const length = clockHands.length;

  clockHands = clockHands
      .map(el => el.map(el => (el ? 4 - el : el)));

  const getFixedNum = (num) => {
    while (num >= 4) num -= 4;
    while (num < 0) num += 4;

    return num;
  }

  const calculator = (arr) => {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        const value = arr[i][j];

        if (arr[i + 1]) {
          arr[i + 1][j] -= value;

          if (arr[i + 1][j - 1] !== undefined) arr[i + 1][j - 1] -= value;
          if (arr[i + 1][j + 1] !== undefined) arr[i + 1][j + 1] -= value;
        }

        if (arr[i + 2]) {
          arr[i + 2][j] -= value;
        }
      }
    }

    return arr[length - 1].map(el => getFixedNum(el));
  }

  const getLastColDiffByHeadIdxValue1 = (headIndex) => {
    const map = new Array(length).fill().map((_el, idx) => {
      const newArray = new Array(length).fill(0);

      if (idx === 0) {
        newArray[headIndex] = -1;

        if (headIndex - 1 >= 0) newArray[headIndex - 1] = -1;
        if (headIndex + 1 < length) newArray[headIndex + 1] = -1;
      }

      if (idx === 1) {
        newArray[headIndex] = -1;
      }

      return newArray;
    });

    return calculator(map);
  }

  const headerOneValueAffectMap = new Array(length).fill().map((_el,idx) => getLastColDiffByHeadIdxValue1(idx));

  const calculated = calculator(JSON.parse(JSON.stringify(clockHands)));
  
  const counter = new Array(length).fill(0);
  const validHeaders = [];

  const increaseCounter = () => {
    counter[length - 1] += 1;

    for (let i = length - 1; i >= 0; i--) {
      if (counter[i] >= 4) {
        if (i === 0) {
          counter[i] = -1;
          return;
        }

        counter[i] = 0;
        counter[i - 1] += 1;
      }
    }
  }

  while (true) {
    if (counter[0] === -1) break;
    let isValid = true;

    for (let i = 0; i < length; i++) {
      const targetSum = calculated[i]
        + headerOneValueAffectMap.reduce((acc, cur, index) => {
          return acc + (cur[i] * counter[index]);
        }, 0)

      
      if (targetSum % 4 !== 0) {

        isValid = false;
        break;
      }
    }

    if (isValid) {
      validHeaders.push([...counter]);
    }

    increaseCounter();
  } 

  const validMaps = validHeaders.map((header) => {
    const map = new Array(length).fill().map((_, idx) => {
      if (idx === 0) return header;

      return new Array(length).fill(null);
    });

    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length; j++) {
        let sum = map[i][j];

        if (map[i][j + 1]) sum += map[i][j + 1];
        if (map[i][j - 1]) sum += map[i][j - 1];
        if (map[i - 1]) sum += map[i - 1][j];

        const resultValue = getFixedNum(clockHands[i][j] - sum);

        map[i + 1][j] = resultValue;
      }
    }

    return map;
  });

  return Math.min(
    ...validMaps.map((map) => map.reduce((acc, cur) => {
      return acc + cur.reduce((acc, cur) => {
        return acc + cur;
      }, 0)
    }, 0))
  )
}