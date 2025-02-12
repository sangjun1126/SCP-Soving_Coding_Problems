function solution(maps) {
  const [row, col] = [maps.length, maps[0].length];

  const bfs = (start, dest) => {
    let q = [start];
    let visited = Array(row)
      .fill()
      .map(() => Array(col).fill(false));
    visited[start[0]][start[1]] = true;

    const dy = [-1, 0, 1, 0]; // 위 오 아래 왼
    const dx = [0, 1, 0, -1];

    while (q.length) {
      const [y, x, d] = q.shift();
      if (maps[y][x] === dest) return d;

      for (let i = 0; i < 4; ++i) {
        const ny = y + dy[i];
        const nx = x + dx[i];
        if (ny < 0 || ny >= row || nx < 0 || nx >= col) continue;
        if (maps[ny][nx] === 'X' || visited[ny][nx]) continue;
        q.push([ny, nx, d + 1]);
        visited[ny][nx] = true;
      }
    }
    return -1;
  };

  let startPos, leverPos;
  for (let i = 0; i < row; ++i) {
    for (let j = 0; j < col; ++j) {
      if (maps[i][j] === 'S') startPos = [i, j, 0];
      if (maps[i][j] === 'L') leverPos = [i, j, 0];
    }
    if (startPos && leverPos) break;
  }

  const leverCnt = bfs(startPos, 'L');
  const exitCnt = bfs(leverPos, 'E');
  if (leverCnt === -1 || exitCnt === -1) return -1;
  return leverCnt + exitCnt;
}
