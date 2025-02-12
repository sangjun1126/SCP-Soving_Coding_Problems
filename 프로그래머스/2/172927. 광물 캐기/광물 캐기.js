function solution(picks, minerals) {
  let ans = 0;
  // 곡괭이로 캘수 있는 광물 수
  const picksSum = picks.reduce((prev, curr) => curr + prev, 0);

  // 주어진 곡괭이로 캘 수 있는 광물까지만
  const sliceMinerals = minerals.slice(0, picksSum * 5);
  
  // 광물 5개씩 잘라서 각 종류 개수 카운팅
  const countedMinerals = sliceMinerals.reduce((prev, curr, idx) => {
    const index = Math.floor(idx / 5);
    if (!prev[index]) prev[index] = [0, 0, 0];
    if (curr === "diamond") {
      prev[index][0]++;
    } else if (curr === "iron") {
      prev[index][1]++;
    } else if (curr === "stone") {
      prev[index][2]++;
    }
    return prev;
  }, []);

  // 다이아, 철 우선순위로 정렬
  const sortedMinerals = countedMinerals.sort(
    (a, b) => b[0] - a[0] || b[1] - a[1]
  );

  // 순회하면서 곡괭이 소모하고 피로도 계산
  sortedMinerals.forEach((value) => {
    const [dia, iron, stone] = value;
    if (picks[0]) {
      ans += dia + iron + stone;
      picks[0]--;
    } else if (picks[1]) {
      ans += dia * 5 + iron + stone;
      picks[1]--;
    } else if (picks[2]) {
      ans += dia * 25 + iron * 5 + stone;
      picks[2]--;
    }
  });

  return ans;
}