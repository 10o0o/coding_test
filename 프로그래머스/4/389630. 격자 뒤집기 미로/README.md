# [level 4] 격자 뒤집기 미로 - 389630 

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/389630?language=javascript) 

### 성능 요약

메모리: 41.3 MB, 시간: 470.16 ms

### 구분

코딩테스트 연습 > 2025 프로그래머스 코드챌린지 본선

### 채점결과

정확성: 100.0<br/>합계: 100.0 / 100.0

### 제출 일자

2025년 04월 11일 11:06:39

### 문제 설명

<p>세로 길이가 <code>n</code>, 가로 길이가 <code>m</code>인 직사각형 모양의 격자판이 있습니다. 가장 왼쪽 위 격자의 좌표는 (1, 1)이고, 가장 오른쪽 아래 격자의 좌표는 (<code>n</code>, <code>m</code>)입니다.</p>

<p>각 격자의 양면에는 자연수가 적혀있습니다. 초기 상태에서는 각 격자의 한 면만이 보이도록 놓여 있습니다.</p>

<p>당신은 아래의 행동을 원하는 만큼 수행할 수 있습니다. 행동을 한번 수행할 때마다 비용 <code>k</code>가 소모됩니다.</p>

<ul>
<li>격자판의 하나의 행 혹은 하나의 열에 존재하는 모든 격자를 뒤집어 보이는 면과 숨겨진 면을 교체할 수 있습니다.</li>
</ul>

<p>모든 행동을 마친 후, (1, 1) 격자에 위치한 말을 (<code>n</code>, <code>m</code>) 격자까지 이동하면서 방문한 격자들의 보이는 수를 점수에 더합니다. 말을 이동할 때는 상하좌우로 인접한 격자로만 이동할 수 있으며, 한번 방문한 격자는 다시 방문할 수 없습니다.</p>

<p>이때, 말을 이동시켜 얻을 수 있는 <code>점수 총합</code> - <code>총 비용</code>의 최댓값을 구하려고 합니다.</p>

<p>예를 들어, 아래 그림과 같이  <code>n</code> = 2, <code>m</code> = 2인 격자판이 있고, <code>k</code> = 0이라고 가정해 보겠습니다.</p>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/production/presigned_urls/4bca2152-d10a-4391-8f44-c3f63ed38554/%E1%84%85%E1%85%B5%E1%84%87%E1%85%A5%E1%84%89%E1%85%B3%E1%84%80%E1%85%A7%E1%86%A8%E1%84%8C%E1%85%A10.jpg" title="" alt="리버스격자0.jpg"></p>

<p>아래와 같이 첫 번째 행과 두 번째 행을 뒤집고 말을 (5 → 7 → 8)과 같이 이동시키면 <code>점수 총합</code>은 20이고 <code>총 비용</code>은 0이며, 이때가 <code>점수 총합</code> - <code>총 비용</code>이 최대입니다.</p>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/production/presigned_urls/591a7d54-80c8-44f2-8b99-8b0a2c9a960d/%E1%84%85%E1%85%B5%E1%84%87%E1%85%A5%E1%84%89%E1%85%B3%E1%84%80%E1%85%A7%E1%86%A8%E1%84%8C%E1%85%A1.jpg" title="" alt="리버스격자.jpg"></p>

<p>각 격자의 현재 보이는 면에 적힌 수를 나타낸 2차원 정수 배열 <code>visible</code>과, 숨겨진 면에 적힌 수를 나타낸 2차원 정수 배열 <code>hidden</code>이 매개변수로 주어집니다. <code>점수 총합</code> - <code>총 비용</code>의 최댓값을 return 하도록 solution 함수를 완성해 주세요.</p>

<hr>

<h5>제한사항</h5>

<ul>
<li>1 ≤ <code>visible</code>의 길이 = <code>n</code> ≤ 14<br>

<ul>
<li>2 ≤ <code>visible[i]</code>의 길이 = <code>m</code> ≤ 100</li>
<li>1 ≤ <code>visible[i][j]</code> ≤ 100<br></li>
</ul></li>
<li><code>hidden</code>의 길이 = <code>n</code>

<ul>
<li><code>hidden[i]</code>의 길이 = <code>m</code></li>
<li>1 ≤ <code>hidden[i][j]</code> ≤ 100<br></li>
<li><code>hidden[i][j]</code>는 <code>visible[i][j]</code>와 같은 격자에 위치한 수입니다. </li>
</ul></li>
<li>0 ≤ <code>k</code> ≤ 100</li>
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
<td>10%</td>
<td><code>n</code> = 1</td>
</tr>
<tr>
<td>#2</td>
<td>20%</td>
<td><code>n</code>과 <code>m</code>이 모두 홀수입니다</td>
</tr>
<tr>
<td>#3</td>
<td>25%</td>
<td>3 ≤ <code>n</code> + <code>m</code> ≤ 16</td>
</tr>
<tr>
<td>#4</td>
<td>45%</td>
<td>추가 제한 사항 없음</td>
</tr>
</tbody>
      </table>
<hr>

<h5>입출력 예</h5>
<table class="table">
        <thead><tr>
<th>visible</th>
<th>hidden</th>
<th>k</th>
<th>result</th>
</tr>
</thead>
        <tbody><tr>
<td>[[1, 2], [3, 4]]</td>
<td>[[5, 6], [7, 8]]</td>
<td>0</td>
<td>20</td>
</tr>
<tr>
<td>[[1, 2], [3, 4]]</td>
<td>[[5, 6], [7, 8]]</td>
<td>5</td>
<td>11</td>
</tr>
</tbody>
      </table>
<hr>

<h5>입출력 예 설명</h5>

<p><strong>입출력 예 #1</strong></p>

<p>문제 예시와 같습니다.</p>

<p><strong>입출력 예 #2</strong></p>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/production/presigned_urls/7517e677-f5b4-4c10-a4f8-702cc1d1e799/%E1%84%85%E1%85%B5%E1%84%87%E1%85%A5%E1%84%89%E1%85%B3%E1%84%80%E1%85%A7%E1%86%A8%E1%84%8C%E1%85%A12.jpg" title="" alt="리버스격자2.jpg"></p>

<p>위와 같이 두 번째 행을 뒤집고 말을 위처럼 이동시키면 <code>점수 총합</code>은 16이고 <code>총 비용</code>은 5이며, 이때가 <code>점수 총합</code> - <code>총 비용</code>이 최대입니다. 따라서 11(= 16 - 5)을 return 해야 합니다.</p>


> 출처: 프로그래머스 코딩 테스트 연습, https://school.programmers.co.kr/learn/challenges