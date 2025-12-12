// src/types/readingGroup.d.ts (새로 생성하거나 기존 파일 수정)

/**
 * GET /api/v1/reading-groups/:groupId/overview 응답의 data 필드 타입
 */
export interface ReadingGroupOverview {
  reading_group_id: number;
  title: string;
  thumbnail_url?: string; // 썸네일 URL은 선택적 필드
  member_count: number;
  days_left: number;
  total_pages: number;
  my_progress: {
    current_page: number;
    memo: string | null;
    rank?: number; // 💡 랭크를 my_progress에 추가 (UI 사용 목적)
  } | null; // 미참여 시 null
}

// TogetherReadCard 컴포넌트에 전달할 최종 UI 데이터 타입
export interface UITogetherReadCard {
  readingGroupId: number;
  title: string;
  participants: number;
  remainDays: number;
  isJoined: boolean;
  progress: number; // 페이지 진행률 (%)
  rank?: number; // 참여자 중 내 등수
  thumbnailUrl?: string;
}