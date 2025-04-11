let groupId = 0;

class SegmentTree {
  constructor(n) {
    this.n = n;
    this.tree = new Array(4 * n).fill(0);
    this.lazy = new Array(4 * n).fill(0);
    this.updates = [0];
    this.map = new Map();
    this.map.set(0, 0);

    this.root = new Array(200000).fill().map((_, index) => index);
      
  }

  mergeRep(x, y) {
    if (!this.map.has(y)) return;
    const yIndex = this._find(this.map.get(y));
    if (!this.map.has(x)) {
      this.updates.push(x);
      this.map.set(x, this.updates.length - 1);
    }
    const xIndex = this._find(this.map.get(x));
    this.root[yIndex] = xIndex;
  }

  _find(x) {
    if (this.root[x] === x) return x;
    return (this.root[x] = this._find(this.root[x]));
  }

  moveRep(x, id) {
    if (!this.map.has(x)) return;
    const updateIndex = this._find(this.map.get(x));
    x = this.updates[updateIndex];
    this.updates[updateIndex] = id;
    this.map.delete(x);
    this.map.set(id, updateIndex);
  }

  _push(node, start, end) {
    if (this.lazy[node] !== 0) {
      this.tree[node] = this.lazy[node];
      if (start !== end) {
        this.lazy[node * 2 + 1] = this.lazy[node];
        this.lazy[node * 2 + 2] = this.lazy[node];
      }
      this.lazy[node] = 0;
    }
  }

  _updateRange(node, start, end, l, r, v) {
    this._push(node, start, end);
    if (end < l || r < start) return;
    if (l <= start && end <= r) {
      this.tree[node] = v;
      if (start !== end) {
        this.lazy[node * 2 + 1] = v;
        this.lazy[node * 2 + 2] = v;
      }
      return;
    }

    const mid = Math.floor((start + end) / 2);
    this._updateRange(node * 2 + 1, start, mid, l, r, v);
    this._updateRange(node * 2 + 2, mid + 1, end, l, r, v);

    const leftVal = this.tree[node * 2 + 1];
    const rightVal = this.tree[node * 2 + 2];
    this.tree[node] = leftVal > rightVal ? leftVal : rightVal;
  }

  updateRange(l, r, id) {
    this.updates.push(id);
    const newIndex = this.updates.length - 1;
    this.map.set(id, newIndex);
    this._updateRange(0, 0, this.n - 1, l, r, newIndex);
  }

  _query(node, start, end, idx) {
    this._push(node, start, end);
    if (start === end) return this.tree[node];
    const mid = Math.floor((start + end) / 2);
    if (idx <= mid) return this._query(node * 2 + 1, start, mid, idx);
    return this._query(node * 2 + 2, mid + 1, end, idx);
  }

  indexQuery(x) {
    return this._query(0, 0, this.n - 1, x);
  }

  query(x) {
    return this.updates[this._find(this.indexQuery(x))];
  }
}

const convertWord = word => word.split('').map(el => el.charCodeAt() - 97);
const ALPHA_LEN = 26;

function solution(s, queries) {
  queries = queries.map(el => el.split(' '));
  s = convertWord(s);
  const n = s.length;
  const sts = new Array(ALPHA_LEN).fill().map(() => new SegmentTree(n));
  const res = [];

  for (const [fl, ...args] of queries) {
    if (fl === '1') {
      const x = +args[0] - 1;
      const y = +args[1] - 1;
      const xid = sts[s[x]].query(x);
      const yid = sts[s[y]].query(y);
      if (xid === yid) res.push('YES');
      else res.push('NO');
    } else if (fl === '2') {
      groupId++;
      const x = +args[0] - 1;
      const word = new Set(convertWord(args[1]));
      const id = sts[s[x]].query(x);
      for (const c of word) {
        sts[c].moveRep(id, groupId);
      }
    } else if (fl === '3') {
      groupId++;
      const x = +args[0] - 1;
      const y = +args[1] - 1;
      const word = new Set(convertWord(args[2]));
      for (const c of word) {
        sts[c].updateRange(x, y, groupId);
      }
    } else if (fl === '4') {
      const x = +args[0] - 1;
      const y = +args[1] - 1;
      let xid = sts[s[x]].query(x);
      let yid = sts[s[y]].query(y);
      if (xid > yid) [xid, yid] = [yid, xid];
      for (const st of sts) {
        st.mergeRep(xid, yid);
      }
    } else if (fl === '5') {
      const bucket = [];
      const collectBox = new Array(groupId + 1)
        .fill()
        .map(() => new Array(26).fill(0));

      for (let x = 0; x < n; x++) {
        const id = sts[s[x]].query(x);
        collectBox[id][s[x]]++;
      }

      for (const collect of collectBox) {
        const box = [];
        for (let i = 0; i < 26; i++) {
          if (!collect[i]) continue;
          box.push(String.fromCharCode(97 + i));
          box.push(collect[i]);
        }
        if (box.length) bucket.push(box.join(' '));
      }
      res.push(...bucket);
    }
  }

  return res;
}
