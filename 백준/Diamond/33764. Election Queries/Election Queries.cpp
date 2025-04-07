#include <bits/stdc++.h>

using namespace std;

#define FASTIO                 \
  ios::sync_with_stdio(false); \
  cin.tie(nullptr);            \
  cout.tie(nullptr);

#define F(i, a, b) for (int i = a; i < b; i += 1)
#define FR(i, b, a) for (int i = b; i >= a; i -= 1)
#define FOF(it, vec) for (auto &it : vec)
#define endl '\n'
#define ALL(v) v.begin(), v.end()
#define DEBUG_VAR(var) cout << #var << ": " << (var) << endl;
// #define DEBUG

typedef long long ll;
typedef pair<int, int> pii;
typedef pair<ll, ll> pll;

class SegmentTree {
 public:
  SegmentTree(vector<int> &arr) {
    this->arr = arr;
    n = arr.size();
    tree.resize(4 * n);
    build(0, 0, n - 1);
  }

  void update(int idx, int value) { update(0, 0, n - 1, idx, value); }
  int queryMax(int compare) { return queryMax(0, 0, n - 1, 0, n - 1, compare); }
  int queryMin(int compare) { return queryMin(0, 0, n - 1, 0, n - 1, compare); }
  int getMax() { return tree[0]; }

 private:
  vector<int> arr, tree;
  int n;

  void build(int node, int start, int end) {
    if (start == end) {
      tree[node] = arr[start];
    } else {
      int mid = (start + end) / 2;
      build(2 * node + 1, start, mid);
      build(2 * node + 2, mid + 1, end);
      tree[node] = max(tree[2 * node + 1], tree[2 * node + 2]);
    }
  }

  int queryMax(int node, int start, int end, int l, int r, int compare) {
    // if (compare == 0) return -1;
    if (start > r || end < l) return -1;
    if (tree[node] < compare) return -1;
    if (start == end) return start;
    int mid = (start + end) / 2;
    int rightAns = queryMax(2 * node + 2, mid + 1, end, l, r, compare);
    if (rightAns != -1) return rightAns;
    return queryMax(2 * node + 1, start, mid, l, r, compare);
  }

  int queryMin(int node, int start, int end, int l, int r, int compare) {
    // if (compare == 0) return -1;
    if (start > r || end < l) return -1;
    if (tree[node] < compare) return -1;
    if (start == end) return start;
    int mid = (start + end) / 2;
    int leftAns = queryMin(2 * node + 1, start, mid, l, r, compare);
    if (leftAns != -1) return leftAns;
    return queryMin(2 * node + 2, mid + 1, end, l, r, compare);
  }

  void update(int node, int start, int end, int idx, int value) {
    if (start == end) {
      tree[node] = value;
    } else {
      int mid = (start + end) / 2;
      if (idx <= mid) {
        update(2 * node + 1, start, mid, idx, value);
      } else {
        update(2 * node + 2, mid + 1, end, idx, value);
      }
      tree[node] = max(tree[2 * node + 1], tree[2 * node + 2]);
    }
  }
};

int main() {
  FASTIO;
  int n, q;
  cin >> n >> q;
  vector<int> votes(n + 1);
  vector<int> freeQuencies(n + 1, 0);
  map<int, int> freqBucket;
  vector<int> maxCandidateForFreq(n + 1, -1), minCandidateForFreq(n + 1, -1);

  F(i, 1, n + 1) {
    int t;
    cin >> t;
    votes[i] = t;
    freeQuencies[t]++;
  }

  F(i, 1, n + 1) {
    if (freeQuencies[i] > 0) {
      freqBucket[freeQuencies[i]]++;
      maxCandidateForFreq[freeQuencies[i]] = i;
      if (minCandidateForFreq[freeQuencies[i]] == -1) {
        minCandidateForFreq[freeQuencies[i]] = i;
      }
    }
  }

  FR(i, n, 2) {
    maxCandidateForFreq[i - 1] = max(maxCandidateForFreq[i], maxCandidateForFreq[i - 1]);
    if (minCandidateForFreq[i] == -1) continue;
    minCandidateForFreq[i - 1] = min(minCandidateForFreq[i], minCandidateForFreq[i - 1]);
  }

  SegmentTree st(freeQuencies);

  while (q--) {
    int i, x;

    cin >> i >> x;
    int res = 0;

    int oldVote = votes[i];
    votes[i] = x;

    freqBucket[freeQuencies[oldVote]]--;
    if (freqBucket[freeQuencies[oldVote]] == 0) {
      freqBucket.erase(freeQuencies[oldVote]);
    }

    if (freeQuencies[x] != 0) {
      freqBucket[freeQuencies[x]]--;
      if (freqBucket[freeQuencies[x]] == 0) {
        freqBucket.erase(freeQuencies[x]);
      }
    }

    freeQuencies[oldVote]--;
    freeQuencies[x]++;
    freqBucket[freeQuencies[x]]++;
    if (freeQuencies[oldVote] != 0) freqBucket[freeQuencies[oldVote]]++;

    st.update(oldVote, freeQuencies[oldVote]);
    st.update(x, freeQuencies[x]);

    maxCandidateForFreq[freeQuencies[oldVote] + 1] = st.queryMax(freeQuencies[oldVote] + 1);
    minCandidateForFreq[freeQuencies[oldVote] + 1] = st.queryMin(freeQuencies[oldVote] + 1);
    maxCandidateForFreq[freeQuencies[x] - 1] = st.queryMax(freeQuencies[x] - 1);
    minCandidateForFreq[freeQuencies[x] - 1] = st.queryMin(freeQuencies[x] - 1);
    maxCandidateForFreq[freeQuencies[oldVote]] = st.queryMax(freeQuencies[oldVote]);
    minCandidateForFreq[freeQuencies[oldVote]] = st.queryMin(freeQuencies[oldVote]);
    maxCandidateForFreq[freeQuencies[x]] = st.queryMax(freeQuencies[x]);
    minCandidateForFreq[freeQuencies[x]] = st.queryMin(freeQuencies[x]);

    int maxVotes = st.getMax();
    vector<int> freqVector;
    FOF(it, freqBucket) freqVector.push_back(it.first);
    int sz = freqVector.size();
    int tail = sz - 1;
    F(head, 0, sz) {
      while (tail >= head && freqVector[tail] + freqVector[head] >= maxVotes) {
        int vote = freqVector[head];
        int opVote = freqVector[tail];
        int voteMin = minCandidateForFreq[vote];
        int voteMax = maxCandidateForFreq[vote];
        int opVoteMin = minCandidateForFreq[opVote];
        int opVoteMax = maxCandidateForFreq[opVote];

        tail--;
        if (voteMin == -1 && voteMax == -1) continue;
        if (voteMin == -1) voteMin = voteMax;
        if (voteMax == -1) voteMax = voteMin;
        if (opVoteMin == -1 && opVoteMax == -1) continue;
        if (opVoteMin == -1) opVoteMin = opVoteMax;
        if (opVoteMax == -1) opVoteMax = opVoteMin;
        res = max(res, abs(voteMax - opVoteMin));
        res = max(res, abs(opVoteMax - voteMin));
      }
      if (tail < head) break;
    }

    cout << res << endl;
  }

  return 0;
}
