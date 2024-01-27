function solution(m, n, startX, startY, balls) {
    const calculate = (direction, [x1, y1], [x2, y2]) => {
        const minX = Math.min(x1, x2);
        const minY = Math.min(y1, y2);
        const maxX = Math.max(x1, x2);
        const maxY = Math.max(y1, y2);
        
        let result;
        
        if (direction === 'u') {
            if (x1 === x2 && y1 <= y2) return Infinity;
            
            const standardX = ((maxX - minX) / ((n - minY) + (n - maxY))) * (n - minY) + minX;
            
            result = Math.pow((maxX - minX), 2) + Math.pow((2 * n - minY - maxY), 2);
        } else if (direction === 'd') {
            if (x1 === x2 && y1 >= y2) return Infinity;
            
            result = Math.pow((maxX - minX), 2) + Math.pow((minY + maxY), 2);
        } else if (direction === 'l') {
            if (y1 === y2 && x1 >= x2) return Infinity;
            
            result = Math.pow((maxY - minY), 2) + Math.pow((minX + maxX), 2);
        } else if (direction === 'r') {
            if (y1 === y2 && x1 <= x2) return Infinity;
            
            result = Math.pow((maxY - minY), 2) + Math.pow((2 * m - minX - maxX), 2);

        }
                
        return result;
    }
    
    const startPox = [startX, startY];
    
    return balls.map((ball) => (
        Math.min(
            calculate('u', startPox, ball),
            calculate('d', startPox, ball),
            calculate('r', startPox, ball),
            calculate('l', startPox, ball),
        )
    ));
}
