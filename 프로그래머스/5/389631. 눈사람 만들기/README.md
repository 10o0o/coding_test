# [level 5] 눈사람 만들기 - 389631 

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/389631?language=javascript) 

### 성능 요약

메모리: 83.3 MB, 시간: 262.00 ms

### 구분

코딩테스트 연습 > 2025 프로그래머스 코드챌린지 본선

### 채점결과

정확성: 100.0<br/>합계: 100.0 / 100.0

### 제출 일자

2025년 04월 11일 11:04:16

### 문제 설명

<p>한밤중 큰 눈이 내려 공원에 눈이 쌓였습니다. 공원은 <code>n</code> × <code>m</code> 크기의 직사각형 격자로 나타낼 수 있습니다. 격자의 <code>r</code>행 <code>c</code>열의 좌표는 <code>(r, c)</code>로 표현합니다. 각 격자 칸은 [눈이 쌓인 칸 / 눈덩이가 있는 칸 / 벽] 셋 중 하나입니다. 격자에는 크기가 1인 눈덩이 두 개만 존재합니다.</p>

<p>당신은 격자에 있는 눈덩이를 상하좌우로 인접한 벽이 아닌 칸으로 원하는 만큼 굴릴 수 있습니다. </p>

<p>눈덩이를 A칸에서 B칸으로 굴리면 B칸의 상태에 따라 다음과 같은 일이 일어납니다.</p>

<ul>
<li>눈이 쌓인 칸 : 눈덩이의 크기가 1 늘어나고, B칸에 쌓여 있던 눈은 사라집니다.</li>
<li>눈이 없는 칸 : 한 번 눈덩이를 굴린 적이 있는 칸에는 눈덩이를 굴려도 크기가 커지지 않습니다.</li>
<li>다른 눈덩이가 있는 칸 : A칸의 눈덩이는 머리가 되고 B칸의 눈덩이는 몸통이 되어 눈사람이 만들어집니다. 눈사람이 된 눈덩이는 더 이상 굴릴 수 없습니다. <strong>단, 머리가 되는 눈덩이가 몸통이 되는 눈덩이보다 크면 눈사람이 만들어지지 않고 눈덩이가 무너져 사라집니다.</strong></li>
</ul>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/production/presigned_urls/c7310574-0d92-4e22-ad73-e2642b8654fc/ex1-1.png" title="" alt="ex1-1.png"></p>

<ul>
<li><code>n</code> = 4, <code>m</code> = 5인 격자의 예시입니다. </li>
</ul>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/production/presigned_urls/ff08a833-90e0-4e16-8074-05057c6c9386/ex1-2.png" title="" alt="ex1-2.png"></p>

<ul>
<li>(2, 2)에 있는 눈덩이를 위로 한 칸 굴리면 크기가 1 늘어납니다. (1 → 2)</li>
</ul>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/production/presigned_urls/832e7a11-b89b-4981-a98e-393b550d4eca/ex1-3.png" title="" alt="ex1-3.png"></p>

<ul>
<li>(3, 2)에 있는 눈덩이를 그림의 화살표대로 굴리면 크기가 3 늘어납니다. (1 → 4)</li>
</ul>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/production/presigned_urls/01243ac6-b263-420e-8008-896bbf7d2ed6/ex1-4.png" title="" alt="ex1-4.png"></p>

<ul>
<li>크기가 2인 눈덩이를 아래로 굴려 크기가 4인 눈덩이 위에 올리면 눈사람을 만들 수 있습니다. 한번 눈사람을 만들면 더 이상 눈덩이를 굴릴 수 없습니다.</li>
</ul>

<p>눈덩이를 굴리는 방법에 따라 여러 가지 크기의 눈사람이 만들어질 수 있습니다. 당신은 만들 수 있는 눈사람의 종류가 얼마나 될지 알고 싶습니다. <strong>눈사람의 머리 혹은 몸통의 크기가 하나라도 다르다면 서로 다른 종류의 눈사람으로 셉니다.</strong> (눈사람이 만들어진 위치가 달라도 머리, 몸통의 크기가 같다면 한 번만 셉니다.)</p>

<p>위 예시로 주어진 격자에서 만들 수 있는 눈사람의 종류는 아래 표의 12가지입니다.</p>
<table class="table">
        <thead><tr>
<th>몸통 크기</th>
<th>머리 크기</th>
</tr>
</thead>
        <tbody><tr>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>2</td>
</tr>
<tr>
<td>3</td>
<td>1</td>
</tr>
<tr>
<td>3</td>
<td>2</td>
</tr>
<tr>
<td>3</td>
<td>3</td>
</tr>
<tr>
<td>4</td>
<td>1</td>
</tr>
<tr>
<td>4</td>
<td>2</td>
</tr>
<tr>
<td>4</td>
<td>3</td>
</tr>
<tr>
<td>5</td>
<td>1</td>
</tr>
<tr>
<td>5</td>
<td>2</td>
</tr>
<tr>
<td>6</td>
<td>1</td>
</tr>
</tbody>
      </table>
<p>격자의 정보를 나타내는 1차원 문자열 배열 <code>grid</code>가 매개변수로 주어집니다. 이때, 눈덩이를 굴려 만들 수 있는 눈사람의 종류의 수를 return 하도록 solution 함수를 완성해 주세요.</p>

<hr>

<h5>제한사항</h5>

<ul>
<li>1 ≤ <code>grid</code>의 세로 길이 = <code>n</code> ≤ 500</li>
<li>1 ≤ <code>grid</code>의 가로 길이 = <code>m</code> ≤ 500

<ul>
<li><code>grid[i][j]</code>는 <code>.</code> / 알파벳 소문자 <code>o</code> / <code>#</code> 중 하나이며 <code>(i+1, j+1)</code> 격자칸 정보를 나타냅니다. <code>.</code>인 경우 눈이 쌓인 칸, <code>o</code>인 경우 눈덩이가 있는 칸, <code>#</code>인 경우 벽입니다.</li>
<li>눈덩이가 있는 칸을 나타내는 <code>o</code>는 두 번 등장합니다.</li>
</ul></li>
<li>눈사람을 만들 수 없는 경우는 주어지지 않습니다.</li>
</ul>

<hr>

<h5>테스트 케이스 구성 안내</h5>

<p>아래는 테스트 케이스 구성을 나타냅니다. 각 그룹 내의 테스트 케이스를 모두 통과하면 해당 그룹에 할당된 점수를 획득할 수 있습니다.</p>
<table class="table">
        <thead><tr>
<th>그룹</th>
<th>총점</th>
<th>추가 제한 사항</th>
</tr>
</thead>
        <tbody><tr>
<td>#1</td>
<td>7%</td>
<td>격자에 벽(#)이 주어지지 않습니다. 3 ≤ <code>n</code> ≤ 10, 3 ≤ <code>m</code> ≤ 10</td>
</tr>
<tr>
<td>#2</td>
<td>14%</td>
<td><code>n</code> × <code>m</code> ≤ 12</td>
</tr>
<tr>
<td>#3</td>
<td>14%</td>
<td><code>n</code> = 1</td>
</tr>
<tr>
<td>#4</td>
<td>65%</td>
<td>추가 제한 사항 없음</td>
</tr>
</tbody>
      </table>
<hr>

<h5>입출력 예</h5>
<table class="table">
        <thead><tr>
<th>grid</th>
<th>result</th>
</tr>
</thead>
        <tbody><tr>
<td>["#.##.", "#o###", ".o.#.", "#..#."]</td>
<td>12</td>
</tr>
<tr>
<td>["##..", "##..", "##.#", ".oo#", "####"]</td>
<td>15</td>
</tr>
<tr>
<td>["###########", "...o.....o.", "###########"]</td>
<td>20</td>
</tr>
<tr>
<td>["###########", "......o..o.", "###########"]</td>
<td>25</td>
</tr>
</tbody>
      </table>
<hr>

<h5>입출력 예 설명</h5>

<p><strong>입출력 예 #1</strong></p>

<p>문제 예시와 같습니다.</p>

<p><strong>입출력 예 #2</strong></p>

<p><code>grid</code>는 다음과 같습니다.</p>
<div class="highlight"><pre class="codehilite"><code>["##..",
 "##..",
 "##.#",
 ".oo#",
 "####"]
</code></pre></div>
<p>위 격자에서 만들 수 있는 눈사람의 (몸통 크기, 머리 크기) 종류는 다음 15가지입니다.</p>
<table class="table">
        <thead><tr>
<th>몸통 크기</th>
<th>머리 크기</th>
</tr>
</thead>
        <tbody><tr>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>2</td>
</tr>
<tr>
<td>3</td>
<td>1</td>
</tr>
<tr>
<td>3</td>
<td>2</td>
</tr>
<tr>
<td>4</td>
<td>1</td>
</tr>
<tr>
<td>4</td>
<td>2</td>
</tr>
<tr>
<td>4</td>
<td>3</td>
</tr>
<tr>
<td>4</td>
<td>4</td>
</tr>
<tr>
<td>5</td>
<td>1</td>
</tr>
<tr>
<td>5</td>
<td>2</td>
</tr>
<tr>
<td>5</td>
<td>3</td>
</tr>
<tr>
<td>6</td>
<td>1</td>
</tr>
<tr>
<td>6</td>
<td>2</td>
</tr>
<tr>
<td>7</td>
<td>1</td>
</tr>
</tbody>
      </table>
<p><strong>입출력 예 #3</strong></p>

<p><code>grid</code>는 다음과 같습니다.</p>
<div class="highlight"><pre class="codehilite"><code>["###########",
 "...o.....o.",
 "###########"]
</code></pre></div>
<p>위 격자에서 만들 수 있는 눈사람의 종류는 20가지입니다.</p>

<p><strong>입출력 예 #4</strong></p>

<p><code>grid</code>는 다음과 같습니다.</p>
<div class="highlight"><pre class="codehilite"><code>["###########",
 "......o..o.",
 "###########"]
</code></pre></div>
<p>위 격자에서 만들 수 있는 눈사람의 종류는 25가지입니다.</p>


> 출처: 프로그래머스 코딩 테스트 연습, https://school.programmers.co.kr/learn/challenges