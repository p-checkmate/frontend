export type ToggleVariant = 'pill' | 'underline';

export interface ToggleTabProps {
  /** 옵션은 항상 두 개 (예: ['인용구', '토론']) */
  options: [string, string];
  /** 현재 선택된 값 (options 중 하나) */
  selected: string;
  /** 탭 클릭했을 때 선택 변경 콜백 */
  onSelect: (option: string) => void;
  /** 스타일 타입: 초록색의 pill 토글, 책 상세의 밑줄형 토글 */
  variant?: ToggleVariant;
  className?: string;
}
