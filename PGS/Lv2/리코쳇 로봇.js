function solution(board) {
  const colLen = board.length;
  const rowLen = board[0].length;
  const memo = new Array(colLen).fill().map((_) => new Array(rowLen).fill(0));
  const dirs = ['U', 'D', 'R', 'L'];
  const dPos = [0, 0];
  let curPos;
  let result = 0;

  for (let i = 0; i < colLen; i += 1) {
    for (let j = 0; j < rowLen; j += 1) {
      if (board[i][j] === 'R') {
        curPos = [i, j];
        memo[i][j] = 1;
        break;
      }
    }

    if (curPos) break;
  }

  const move = (dir, targetPos) => {
    if (dir === 'U') dPos[0] = -1;
    else if (dir === 'D') dPos[0] = 1;
    else if (dir === 'R') dPos[1] = 1;
    else if (dir === 'L') dPos[1] = -1;

    const resultPos = [targetPos[0], targetPos[1]];

    while (
      board[resultPos[0]]
            && board[resultPos[0]][resultPos[1]]
            && board[resultPos[0]][resultPos[1]] !== 'D'
    ) {
      resultPos[0] += dPos[0];
      resultPos[1] += dPos[1];
    }

    resultPos[0] -= dPos[0];
    resultPos[1] -= dPos[1];

    dPos[0] = 0;
    dPos[1] = 0;

    return resultPos;
  };

  let positions = [curPos];

  while (positions.length) {
    result += 1;
    const newPositions = [];

    for (const pos of positions) {
      for (const dir of dirs) {
        const movedPos = move(dir, pos);

        if (board[movedPos[0]][movedPos[1]] === 'G') {
          return result;
        }

        if (!memo[movedPos[0]][movedPos[1]]) {
          memo[movedPos[0]][movedPos[1]] = 1;
          newPositions.push(movedPos);
        }
      }
    }

    positions = newPositions;
  }

  return -1;
}