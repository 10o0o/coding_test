# [level 4] 가장 큰 삼각형 덩어리 - 389629 

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/389629) 

### 성능 요약

메모리: 94.3 MB, 시간: 491.02 ms

### 구분

코딩테스트 연습 > 2025 프로그래머스 코드챌린지 본선

### 채점결과

정확성: 100.0<br/>합계: 100.0 / 100.0

### 제출 일자

2025년 04월 11일 11:06:46

### 문제 설명

<p><code>N</code>행 <code>M</code>열의 2차원 격자 <code>grid</code>가 주어집니다. 격자의 각 칸은 한 변의 길이가 √2인 정사각형이며, 각 칸 안에는 대각선이 하나 그어져 있습니다. 이 대각선은 / 방향(1) 또는 \ 방향(-1) 중 하나입니다.</p>

<p>각 정사각형 칸은 대각선에 의해 동일한 크기의 직각삼각형 두 개로 나뉘며, 당신은 각 칸에서 두 삼각형 중 정확히 하나만 색칠할 수 있습니다. 색칠된 삼각형들은 한 '변'을 공유해야 서로 연결되며, 이렇게 연결된 삼각형들의 집합을 하나의 삼각형 덩어리라고 합니다.</p>

<p>당신의 목표는 격자 전체를 적절히 색칠하여, 연결된 하나의 삼각형 덩어리 중 가능한 가장 큰 덩어리의 넓이를 구하는 것입니다. 각 삼각형의 넓이는 칸을 이루는 정사각형의 면적(2)의 절반인 1입니다. 따라서 덩어리에 포함된 삼각형의 개수가 곧 그 덩어리의 넓이가 됩니다.</p>

<p>격자의 상태를 나타내는 2차원 정수 배열 <code>grid</code>가 매개변수로 주어집니다. 이 격자를 적절히 색칠했을 때, 만들 수 있는 삼각형 덩어리들 중에서 가장 넓이가 큰 덩어리의 넓이를 return 하도록 solution 함수를 완성해 주세요.</p>

<hr>

<h5>제한사항</h5>

<ul>
<li>1 ≤ <code>grid</code>의 세로 길이 = <code>N</code> ≤ 200,000</li>
<li>1 ≤ <code>grid</code>의 가로 길이 = <code>M</code> ≤ 200,000</li>
<li>1 ≤ <code>N</code> × <code>M</code> ≤ 200,000</li>
<li><code>grid[i][j]</code>는 -1, 1 중 하나의 값을 가집니다.</li>
<li><code>grid[i][j]</code>가 -1이면 \ 방향을 나타내며, 1이면 / 방향을 나타냅니다.</li>
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
<td>50%</td>
<td><code>N</code> × <code>M</code> ≤ 20</td>
</tr>
<tr>
<td>#2</td>
<td>50%</td>
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
<td>[[-1, -1, -1], [1, 1, -1], [1, 1, 1]]</td>
<td>5</td>
</tr>
<tr>
<td>[[1, -1, 1], [-1, 1, -1]]</td>
<td>4</td>
</tr>
<tr>
<td>[[1]]</td>
<td>1</td>
</tr>
</tbody>
      </table>
<hr>

<h5>입출력 예 설명</h5>

<p><strong>입출력 예 #1</strong></p>

<p>격자의 상태는 아래 그림과 같습니다.</p>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/production/presigned_urls/e5514afc-6c33-4964-b9c1-3af087a93095/triex1.png" title="" alt="triex1.png"></p>

<p>각 칸에서 한 개의 삼각형을 적절히 색칠했을 때, '하나로 연결된 삼각형 덩어리' 중 넓이가 가장 큰 경우는 아래 그림에서 색칠된 부분과 같습니다. 이 경우 덩어리의 넓이는 5이므로, 5를 return 해야 합니다.</p>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/production/presigned_urls/7c96ee33-89a4-47da-9286-0881c465b0ac/triex1_1.png" title="" alt="triex1_1.png"></p>

<p><strong>입출력 예 #2</strong></p>

<p>격자의 상태는 아래 그림과 같습니다.</p>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/production/presigned_urls/b2923e59-cb35-4eeb-9984-29d2a1f93729/triex1_2.png" title="" alt="triex1_2.png"></p>

<p>각 칸에서 한 개의 삼각형을 적절히 색칠했을 때, '하나로 연결된 삼각형 덩어리' 중 넓이가 가장 큰 경우는 아래 그림에서 색칠된 부분과 같습니다. 이 경우 덩어리의 넓이는 4이므로, 4를 return 해야 합니다.</p>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/production/presigned_urls/60a97b6c-d2aa-4ce4-a120-9ee3b4790d31/triex1_3.png" title="" alt="triex1_3.png"></p>

<p><strong>입출력 예 #3</strong></p>

<p>최대 1개의 삼각형을 색칠할 수 있습니다. 삼각형 하나의 넓이인 1을 return 합니다.</p>


> 출처: 프로그래머스 코딩 테스트 연습, https://school.programmers.co.kr/learn/challenges