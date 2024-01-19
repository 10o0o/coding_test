/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
class UnionFind {
  constructor(size) {
    this.parent = new Array(size);
    this.rank = new Array(size);

    for (let i = 0; i < size; i += 1) {
      this.parent[i] = i;
      this.rank[i] = 0;
    }

    this.rank[1] = Infinity;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX] += 1;
      }
    }
  }

  getUniques() {
    return this.parent.filter((el, index) => (index !== 0 && el === index));
  }
}

function solution(n, roads) {
  const uf = new UnionFind(n + 1);
  const towardGroups = new Array(n + 1).fill().map((_) => []);

  for (const [from, to] of roads) {
    towardGroups[from].push(to);
  }

  const visited = new Array(n + 1).fill(0);
  const stackIndex = new Array(n + 1).fill(null);
  stackIndex[1] = 0;
  visited[1] = 1;

  const dfs = (curIndex, stack) => {
    const towardGroup = towardGroups[curIndex];

    for (const towardIndex of towardGroup) {
      const prefixedTowardIndex = uf.find(towardIndex);
      if (!visited[prefixedTowardIndex]) {
        visited[prefixedTowardIndex] = 1;
        stack.push(prefixedTowardIndex);
        stackIndex[prefixedTowardIndex] = stack.length - 1;
        dfs(prefixedTowardIndex, stack);
        stack.pop();
        stackIndex[prefixedTowardIndex] = null;
      } else {
        const index = stackIndex[prefixedTowardIndex];

        if (index !== null) {
          const value = stack[index];
          const rootValue = uf.find(value);
          uf.rank[rootValue] = Infinity;

          for (let i = index + 1; i < stack.length; i += 1) {
            uf.union(value, stack[i]);
          }
        }
      }
    }
  };

  dfs(1, [1]);

  const prefixTowardGroups = new Array(n + 1).fill().map((_) => []);

  for (const [from, to] of roads) {
    const prefixedFrom = uf.find(from);
    const prefixedTo = uf.find(to);

    if (prefixedFrom !== prefixedTo) {
      prefixTowardGroups[prefixedFrom].push(prefixedTo);
    }
  }

  const towardDirectly = new Array(n + 1);

  const visited2 = new Array(n + 1).fill(0);
  const dfs2 = (x) => {
    let directTowardGroup = new Set();
    visited2[x] = 1;
    const towardGroup = prefixTowardGroups[x];

    for (const toward of towardGroup) {
      directTowardGroup.add(toward);
      if (!visited2[toward]) {
        directTowardGroup = new Set([...directTowardGroup, ...dfs2(toward)]);
      } else {
        directTowardGroup = new Set([...directTowardGroup, ...towardDirectly[toward]]);
      }
    }

    towardDirectly[x] = directTowardGroup;
    return directTowardGroup;
  };

  dfs2(1);

  const uniques = uf.getUniques();
  const fromDirectly = new Array(n + 1).fill().map(() => new Set());

  for (const unique of uniques) {
    for (const el of towardDirectly[unique]) {
      fromDirectly[el].add(unique);
    }
  }

  const assigns = new Array(n + 1).fill(0);

  const bMatching = (x, memo) => {
    const fromGroup = fromDirectly[x];

    for (const from of fromGroup) {
      if (memo[from]) continue;

      memo[from] = 1;

      if (!assigns[from] || bMatching(assigns[from], memo)) {
        assigns[from] = x;

        return true;
      }
    }

    return false;
  };

  let result = 0;

  for (const unique of uniques) {
    if (bMatching(unique, new Array(n + 1).fill(0))) {
      result += 1;
    }
  }
  return uniques.length - result - 1;
}
