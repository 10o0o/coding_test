/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
class UnionFind {
  constructor(size) {
    this.parent = new Array(size);

    for (let i = 0; i < size; i += 1) {
      this.parent[i] = i;
    }
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

    this.parent[rootY] = rootX;
  }

  getUniques() {
    return this.parent.filter((el, index) => (index !== 0 && el === index));
  }

  compress() {
    for (let i = 1; i < this.parent.length; i += 1) {
      this.parent[i] = this.find(this.parent[i]);
    }
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
