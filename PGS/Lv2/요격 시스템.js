function solution(targets) {
    targets.sort((a, b) => a[1] - b[1]);
    
    let result = 0;
    let lastShootPos = -1;
    
    for (const target of targets) {
        const [startPos, endPos] = target;
        
        if (lastShootPos < startPos) {
            lastShootPos = endPos - 1;
            result += 1;
        }
    }
    
    return result;
}