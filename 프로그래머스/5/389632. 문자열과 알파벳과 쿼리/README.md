# [level 5] 문자열과 알파벳과 쿼리 - 389632 

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/389632) 

### 성능 요약

메모리: 516 MB, 시간: 8465.83 ms

### 구분

코딩테스트 연습 > 2025 프로그래머스 코드챌린지 본선

### 채점결과

정확성: 100.0<br/>합계: 100.0 / 100.0

### 제출 일자

2025년 04월 11일 11:03:22

### 문제 설명

<p>알파벳 소문자로 이루어진 초기 문자열 <code>s</code>가 주어집니다. <br>
초기 문자열에 포함된 모든 문자들은 고유한 번호를 가지며, n번 문자는 초기 문자열의 n번째 문자를 의미합니다. <br>
예를 들어, 초기 문자열이 <code>"aba"</code>라면 1번 문자는 a, 2번 문자는 b, 3번 문자는 a입니다. 그 후, 초기 문자열에서 1번 문자를 분리해 <code>"a"</code> / <code>"ba"</code> 두 개의 문자열로 나눠졌다면, <code>"a"</code>는 1번 문자로 이루어진 문자열이고 <code>"ba"</code>는 2번 문자와 3번 문자로 이루어진 문자열입니다.</p>

<p>당신은 주어진 문자열에 대해 다음과 같은 5가지 쿼리를 수행해야 합니다. 쿼리는 모두 문자열로 주어집니다.</p>

<ul>
<li><code>1 x y</code> : 숫자 1과 정수 <code>x</code>, <code>y</code>가 공백 하나를 사이에 두고 주어집니다. <code>x</code>번 문자와 <code>y</code>번 문자가 같은 문자열에 포함돼 있는지 확인합니다. 같은 문자열에 포함되어 있으면 <strong><code>"YES"</code></strong>를, 포함되어있지 않으면 <strong><code>"NO"</code></strong>를 result 배열의 뒤에 추가합니다.<br></li>
<li><code>2 x word</code> : 숫자 2와 정수 <code>x</code>, 문자열 <code>word</code>가 공백 하나를 사이에 두고 주어집니다. <code>x</code>번 문자가 있는 문자열을 찾습니다. 해당 문자열에서 <code>word</code>에 포함된 알파벳을 모두 새로 생성한 빈 문자열로 옮깁니다.</li>
<li><code>3 x y word</code> : 숫자 3과 정수 <code>x</code>, <code>y</code>가 공백 하나를 사이에 두고 주어집니다. 빈 문자열을 생성한 뒤, <code>x</code>~<code>y</code>번 문자들 중 <code>word</code>에 포함된 알파벳을 모두 새로 생성한 빈 문자열로 옮깁니다.</li>
<li><code>4 x y</code> : 숫자 4와 정수 <code>x</code>, <code>y</code>가 공백 하나를 사이에 두고 주어집니다. <code>x</code>번 문자가 포함된 문자열과 <code>y</code>번 문자가 포함된 문자열을 하나의 문자열로 합칩니다. <strong>먼저 생성된 문자열에 늦게 생성된 문자열이 합쳐지는 형식으로 먼저 생성된 문자열만 남고 늦게 생성된 문자열은 사라집니다.</strong></li>
<li><code>5</code> : 숫자 5가 주어집니다. 항상 쿼리의 마지막에 한 번만 주어집니다. 존재하는 모든 문자열에 대해 문자열의 알파벳 구성을 각각 <code>result</code> 배열의 뒤에 추가합니다. 모든 문자열의 <code>알파벳 구성</code>을 문자열이 먼저 생성된 순으로 <code>result</code> 배열의 뒤에 추가합니다. </li>
</ul>

<p>유의 사항은 다음과 같습니다. </p>

<ul>
<li>같은 문자열 안에 있는 문자들은 항상 번호순으로 정렬합니다. </li>
<li>문자열의 길이가 0이 되면 해당 문자열은 사라집니다.</li>
</ul>

<p>문자열의 <code>알파벳 구성</code>은 다음과 같습니다.</p>

<ul>
<li>문자열의 <code>알파벳 구성</code>은 하나의 문자열입니다.</li>
<li>a부터 z까지 사전 순으로 알파벳과, 해당 알파벳이 문자열에 포함된 개수를 공백 하나로 구분한 형태입니다.</li>
<li>예를 들어, "abaebae" 처럼 a 3개, b 2개, e 2개로 이루어진 문자열의 <code>알파벳 구성</code>은 "a 3 b 2 e 2"입니다.</li>
</ul>

<p>초기 문자열 <code>s</code>와 쿼리를 담고 있는 문자열 배열 <code>query</code>가 주어집니다. 쿼리를 주어진 순서대로 모두 마친 후의 result 배열을 return 하도록 solution 함수를 완성해 주세요. </p>

<hr>

<h5>제한사항</h5>

<ul>
<li>1 ≤ <code>s</code>의 길이 ≤ 100,000

<ul>
<li><code>s</code>의 원소는 알파벳 소문자로만 이루어져 있습니다.</li>
</ul></li>
<li>1 ≤ <code>query</code>의 길이 ≤ 200,000

<ul>
<li>1 ≤ <code>x</code>, <code>y</code> ≤ <code>s</code>의 길이</li>
<li>3번 쿼리의 경우 <code>x</code> ≤ <code>y</code></li>
<li>1 ≤ <code>word</code>의 길이 ≤ 26</li>
<li><code>word</code>의 원소는 알파벳 소문자로만 이루어져 있습니다.</li>
</ul></li>
</ul>

<hr>

<h5>테스트 케이스 구성 안내</h5>

<p>아래는 테스트 케이스 구성을 나타냅니다. 각 그룹 내의 테스트 케이스를 모두 통과하면 해당 그룹에 할당된 점수를 획득할 수 있습니다.</p>
<table class="table">
        <thead><tr>
<th>그룹</th>
<th>총점</th>
<th>테스트 케이스 그룹 설명</th>
</tr>
</thead>
        <tbody><tr>
<td>#1</td>
<td>4%</td>
<td><code>s</code>의 길이, <code>query</code>의 길이 ≤ 100</td>
</tr>
<tr>
<td>#2</td>
<td>4%</td>
<td><code>s</code>의 길이, <code>query</code>의 길이 ≤ 1,000</td>
</tr>
<tr>
<td>#3</td>
<td>7%</td>
<td><code>s</code>의 길이, <code>query</code>의 길이 ≤ 20,000</td>
</tr>
<tr>
<td>#4</td>
<td>35%</td>
<td>4번 쿼리가 주어지지 않음</td>
</tr>
<tr>
<td>#5</td>
<td>50%</td>
<td>추가 제한 사항 없음</td>
</tr>
</tbody>
      </table>
<hr>

<h5>입출력 예</h5>
<table class="table">
        <thead><tr>
<th>s</th>
<th>query</th>
<th>result</th>
</tr>
</thead>
        <tbody><tr>
<td><code>"programmers"</code></td>
<td><code>["1 1 5", "2 1 rm", "1 1 5", "5"]</code></td>
<td><code>["YES", "NO", "a 1 e 1 g 1 o 1 p 1 s 1", "m 2 r 3"]</code></td>
</tr>
<tr>
<td><code>"abacadae"</code></td>
<td><code>["3 1 4 aa", "1 1 5", "4 1 7", "1 1 5", "5"]</code></td>
<td><code>["NO", "YES", "a 4 b 1 c 1 d 1 e 1"]</code></td>
</tr>
</tbody>
      </table>
<hr>

<h5>입출력 예 설명</h5>

<p><strong>입출력 예 #1</strong></p>

<p>초기 문자열은 <code>"programmers"</code>입니다.</p>

<ol>
<li><code>1 1 5</code> 쿼리를 실행하면 1번 문자 p와 5번 문자 r은 같은 문자열에 있으므로 <code>result</code>에 <code>"YES"</code>를 추가합니다.</li>
<li><code>2 1 rm</code> 쿼리를 실행하면 빈 문자열을 추가로 생성하고, 1번 문자 p가 속한 문자열 <code>"programmers"</code>에 존재하는 r과 m을 추가로 생성한 문자열에 옮깁니다. 쿼리를 수행한 후에 존재하는 문자열은 <code>"pogaes"</code>와 <code>"rrmmr"</code> 두 문자열입니다. <code>"pogaes"</code>는 1, 3, 4, 6, 9, 11번 문자들로 이루어져 있고, <code>"rrmmr"</code>는 2, 5, 7, 8, 10번 문자들로 이루어져 있습니다.</li>
<li><code>1 1 5</code> 쿼리를 실행하면 1번 문자 p는 문자열 <code>"pogaes"</code>에 속하고 5번 문자 r은 <code>"rrmmr"</code>에 속합니다. 따라서, <code>result</code>에 <code>"NO"</code>를 추가합니다.</li>
<li><code>5</code> 쿼리를 실행하면 문자열이 생성된 순서인 <code>"pogaes"</code>, <code>"rrmmr"</code> 순으로 알파벳 구성을 <code>result</code>에 추가하게 됩니다. <code>"pogaes"</code>의 알파벳 구성인 <code>"a 1 e 1 g 1 o 1 p 1 s 1"</code>와 <code>"rrmmr"</code>의 알파벳 구성인 <code>"m 2 r 3"</code>를 차례로 <code>result</code>에 추가합니다.</li>
</ol>

<p>쿼리를 모두 수행한 후의 <code>result</code>는 <code>["YES", "NO", "a 1 e 1 g 1 o 1 p 1 s 1", "m 2 r 3"]</code>가 됩니다.</p>

<p><strong>입출력 예 #2</strong></p>

<p>초기 문자열은 <code>"abacadae"</code>입니다.</p>

<ol>
<li><code>3 1 4 aa</code> 쿼리를 실행하면 빈 문자열을 추가로 생성하고, 1번 문자부터 4번 문자 중에서 존재하는 a를 빼내 추가로 생성한 문자열에 옮깁니다. 쿼리를 수행한 후에 존재하는 문자열은 <code>"bcadae"</code>와 <code>"aa"</code> 두 문자열입니다. <code>"bcadae"</code>는 2, 4, 5, 6, 7, 8번 문자들로 이루어져 있고, <code>"aa"</code>는 1, 3번 문자들로 이루어져 있습니다.</li>
<li><code>1 1 5</code> 쿼리를 실행하면 1번 문자 a는 문자열 <code>"aa"</code>에 속하고 5번 문자 a는 문자열 <code>"bcadae"</code>에 속합니다. 따라서, <code>result</code>에 <code>"NO"</code>를 추가합니다.</li>
<li><code>4 1 7</code> 쿼리를 실행하면 1번 문자가 속한 문자열 <code>"aa"</code>와 7번 문자가 속한 <code>"bcadae"</code>를 합칩니다. <code>"aa"</code>가 상대적으로 늦게 생성됐으므로 <code>"aa"</code>가 사라지고 <code>"bcadae"</code>에 합쳐집니다. 쿼리를 수행한 후에 존재하는 문자열은 <code>"abacadae"</code> 하나입니다.</li>
<li><code>1 1 5</code> 쿼리를 실행하면 1번 문자와 5번 문자가 <code>"abacadae"</code> 문자열에 속하므로 <code>"YES"</code>를 <code>result</code>에 추가합니다.</li>
<li><code>5</code> 쿼리를 실행하면 유일하게 존재하는 문자열인 <code>"abacadae"</code>의 알파벳 구성을 <code>result</code>에 추가합니다. <code>"a 4 b 1 c 1 d 1 e 1"</code>가 <code>result</code>에 추가됩니다.</li>
</ol>

<p>쿼리를 모두 수행한 후의 <code>result</code>는 <code>["NO”, "YES", "a 4 b 1 c 1 d 1 e 1"]</code>가 됩니다.</p>


> 출처: 프로그래머스 코딩 테스트 연습, https://school.programmers.co.kr/learn/challenges