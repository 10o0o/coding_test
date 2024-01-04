/* eslint-disable no-param-reassign */
class Heap {
  constructor(compare) {
    this.arr = [];
    this.compare = compare;

    this.getParentIndex = (i) => Math.floor((i - 1) / 2);
    this.getLeftChild = (i) => i * 2 + 1;
    this.getRightChild = (i) => i * 2 + 2;
    this.swap = (idx1, idx2) => {
      [
        [
          this.arr[idx1], this.arr[idx2],
        ],
      ] = [
        [
          this.arr[idx2], this.arr[idx1],
        ],
      ];
    };
  }

  bubbleUp() {
    let index = this.arr.length - 1;
    let parentIndex = this.getParentIndex(index);

    while (index && this.compare(this.arr[parentIndex], this.arr[index])) {
      this.swap(parentIndex, index);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  bubbleDown() {
    let index = 0;
    let leftIndex = this.getLeftChild(index);
    let rightIndex = this.getRightChild(index);

    while (
      (this.arr[leftIndex]
        && this.compare(this.arr[index], this.arr[leftIndex])
      ) || (
        this.arr[rightIndex]
        && this.compare(this.arr[index], this.arr[rightIndex])
      )) {
      const targetIndex = (
        this.arr[rightIndex] && this.compare(this.arr[leftIndex], this.arr[rightIndex])
      ) ? rightIndex : leftIndex;

      this.swap(index, targetIndex);

      index = targetIndex;
      leftIndex = this.getLeftChild(index);
      rightIndex = this.getRightChild(index);
    }
  }

  push(x) {
    this.arr.push(x);
    this.bubbleUp();
  }

  pop() {
    if (this.arr.length === 1) return this.arr.pop();

    const value = this.arr[0];
    this.arr[0] = this.arr.pop();
    this.bubbleDown();

    return value;
  }

  size() {
    return this.arr.length;
  }
}

function solution(coin, cards) {
  const minHeap = new Heap((parent, child) => parent > child);
  const maxHeap = new Heap((parent, child) => parent < child);

  const discardedCards = new Array(cards.length + 1).fill(false);
  const onHandCards = new Array(cards.length + 1).fill(false);
  const initHandCards = new Array(cards.length + 1).fill(false);

  const indexMap = cards
    .map((card, index) => [card, index])
    .sort((a, b) => a[0] - b[0])
    .map((info) => info[1]);

  const getOppositeCardIndex = (cardIndex) => indexMap[cards.length - cards[cardIndex]];
  const getOppositeCard = (cardIndex) => cards.length + 1 - cards[cardIndex];
  const initSize = cards.length / 3;

  let result = 1;
  let couples = 0;

  for (let i = 0; i < initSize; i += 1) {
    if (!discardedCards[cards[i]]) {
      if (getOppositeCardIndex(i) < initSize) {
        couples += 1;
        discardedCards[cards[i]] = true;
        discardedCards[getOppositeCard(i)] = true;
      } else {
        onHandCards[cards[i]] = true;
        initHandCards[cards[i]] = true;
      }
    }
  }

  const getCouples = () => {
    while (minHeap.size()) {
      const minIndex = minHeap.pop();
      const oppoCard = cards[minIndex];
      const card = cards[getOppositeCardIndex(minIndex)];

      if (onHandCards[card] && onHandCards[oppoCard]) {
        couples += 1;

        discardedCards[card] = true;
        onHandCards[card] = false;

        discardedCards[oppoCard] = true;
        onHandCards[oppoCard] = false;

        break;
      }
    }
  };

  const getCoin = () => {
    while (maxHeap.size()) {
      const maxIndex = maxHeap.pop();
      const oppoCard = cards[maxIndex];
      const card = cards[getOppositeCardIndex(maxIndex)];

      if (onHandCards[card] && !initHandCards[card]) {
        coin += 1;

        discardedCards[card] = true;
        onHandCards[card] = false;

        if (onHandCards[oppoCard] && !initHandCards[oppoCard]) {
          coin += 1;

          onHandCards[oppoCard] = false;
        }

        discardedCards[oppoCard] = true;

        break;
      }
    }
  };

  for (let i = initSize; i < cards.length; i += 2) {
    if (!discardedCards[getOppositeCard(i)]
    && !discardedCards[cards[i]]) {
      onHandCards[cards[i]] = true;
      minHeap.push(getOppositeCardIndex(i));
      maxHeap.push(getOppositeCardIndex(i));
      coin -= 1;
    }

    if (!discardedCards[getOppositeCard(i + 1)]
    && !discardedCards[cards[i + 1]]) {
      onHandCards[cards[i + 1]] = true;
      minHeap.push(getOppositeCardIndex(i + 1));
      maxHeap.push(getOppositeCardIndex(i + 1));
      coin -= 1;
    }

    while (coin < 0) {
      getCoin();
    }

    if (!couples) getCouples();

    if (!couples) {
      break;
    }

    result += 1;
    couples -= 1;
  }

  return result;
}

const result1 = solution(4, [3, 6, 7, 2, 1, 10, 5, 9, 8, 12, 11, 4]);
console.log('result1: ', result1); // 5

const result2 = solution(3, [1, 2, 3, 4, 5, 8, 6, 7, 9, 10, 11, 12]);
console.log('result2: ', result2); // 2

const result3 = solution(2, [5, 8, 1, 2, 9, 4, 12, 11, 3, 10, 6, 7]);
console.log('result3: ', result3); // 4

const result4 = solution(10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
console.log('result4: ', result4); // 1
