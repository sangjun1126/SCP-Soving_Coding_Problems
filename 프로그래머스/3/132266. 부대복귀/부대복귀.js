function solution(n, roads, sources, destination) {
    const answer = [];
    
    // 노드 저장
    const adjL = Array(n+1).fill().map(() => []);
    for (const [start, to] of roads) {
        adjL[start].push(to);
        adjL[to].push(start);
    };
    
    // destination에서 출발하는 너비 우선 탐색
    let visited = Array(n+1).fill().map(() => -1);
    const q = [destination];
    visited[destination] = 0;
    while (q.length) {
        const cd = q.shift();
        for (const nd of adjL[cd]) {
            if (visited[nd] == -1) {
                visited[nd] = visited[cd] + 1;
                q.push(nd);
            };
        };
    };
    
    for (const source of sources) {
        answer.push(visited[source]);
    };
    
    return answer;
}