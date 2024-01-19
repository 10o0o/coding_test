function solution(plans) {
  const queue = plans.map((plan) => {
    const [name, time, spend] = plan;
    const [hour, minute] = time.split(':');
    const convertedTime = Number(hour) * 60 + Number(minute);

    return [name, convertedTime, Number(spend)];
  })
    .sort((a, b) => a[1] - b[1]);

  const result = [];
  const first = queue.shift();
  let curTime = first[1];

  const stack = [first];

  while (queue.length) {
    const target = queue.shift();
    const [_name, time, _spend] = target;
    let timeDiff = time - curTime;
    curTime = time;

    while (stack.length && timeDiff > 0) {
      const latestPlan = stack.pop();
      const [lName, _lTime, lSpend] = latestPlan;

      if (lSpend <= timeDiff) {
        result.push(lName);
        timeDiff -= lSpend;
      } else {
        latestPlan[2] = lSpend - timeDiff;
        timeDiff = 0;
        stack.push(latestPlan);
      }
    }

    stack.push(target);
  }
  while (stack.length) {
    result.push(stack.pop()[0]);
  }

  return result;
}