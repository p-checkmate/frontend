// src/api/main/togetherRead.api.ts

import api from '@/api/api';

// ===============================================
// API 응답 타입 정의
// ===============================================

// 1. GET /overview 응답 타입
export interface TogetherReadOverviewResponse {
  reading_group_id: number;
  title: string;
  member_count: number; // 참여자 수
  days_left: number; // 남은 기간 (D-Day)
  total_pages: number; // 해당 도서 총 페이지
  my_progress: {
    current_page: number;
    memo: string | null;
  } | null; // 미참여 시 null
}

// 2. GET /members 응답 타입 (마라톤 참여자 목록)
export interface MemberItem {
  member_id: number;
  user_id: number;
  nickname: string;
  level: 1 | 2 | 3 | 4 | 5;
  current_page: number; // 읽은 페이지
  memo: string; // 한줄 메모
  is_current_user: boolean; // 현재 로그인된 유저인지 여부
}

export interface TogetherReadMembersResponse {
  page: number;
  limit: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  total_page_count: number; // 총 페이지 수 (overview와 중복될 수 있으나 API 명세 따름)
  members: MemberItem[];
}

// ===============================================
// API 함수 구현
// ===============================================

/**
 * 함께 읽기 그룹의 개요 정보를 가져옵니다. (페이지 상단 및 MyReadCard 데이터)
 * GET /api/v1/reading-groups/:groupId/overview
 */
export const fetchTogetherReadOverview = async (
  groupId: number,
): Promise<TogetherReadOverviewResponse> => {
  // 💡 URL 중복 제거
  const data = await api.get(`/reading-groups/${groupId}/overview`);
  return data as unknown as TogetherReadOverviewResponse;
};

/**
 * 함께 읽기 그룹의 모든 참여자 목록을 가져옵니다. (마라톤 카드 목록 데이터)
 * GET /api/v1/reading-groups/:groupId/members
 */
export const fetchTogetherReadMembers = async (
  groupId: number,
): Promise<TogetherReadMembersResponse> => {
  // 💡 URL 중복 제거
  const data = await api.get(`/reading-groups/${groupId}/members`);
  return data as unknown as TogetherReadMembersResponse;
};

/**
 * 내 독서 진행 상황을 업데이트합니다. (MyReadCard 업데이트)
 * PATCH /api/v1/reading-groups/:groupId/progress
 */
export const updateMyReadingProgress = async (
  groupId: number,
  currentPage: number,
  memo: string,
): Promise<void> => {
  // 💡 URL 중복 제거
  await api.patch(`/reading-groups/${groupId}/progress`, {
    current_page: currentPage,
    memo: memo,
  });
};