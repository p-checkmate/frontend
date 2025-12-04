// 등급 번호와 이름 매핑
export const RANK_NAMES: Record<number, string> = {
  1: '새싹',
  2: '나무',
  3: '종이',
  4: '수첩',
  5: '책',
};

// 등급별 기준 데이터 (모달 등에서 사용)
export const RANK_DATA = [
  { id: 5, label: '책', exp: 2000, height: 'h-[165px]' },
  { id: 4, label: '수첩', exp: 1000, height: 'h-[142px]' },
  { id: 3, label: '종이', exp: 500, height: 'h-[117px]' },
  { id: 2, label: '나무', exp: 200, height: 'h-[92px]' },
  { id: 1, label: '새싹', exp: 100, height: 'h-[65px]' },
];