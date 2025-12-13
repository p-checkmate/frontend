// src/api/togetherRead/togetherRead.api.ts
import api from '@/api/api';

// ===== Types =====
export type ReadingGroupOverview = {
  reading_group_id: number;
  title: string;
  member_count: number;
  days_left: number;
  total_pages: number;
  my_progress: {
    current_page: number;
    memo: string;
  } | null;
};

export type ReadingGroupMember = {
  member_id: number;
  user_id: number;
  nickname: string;
  level: 1 | 2 | 3 | 4 | 5;
  current_page: number;
  memo: string;
  is_current_user: boolean;
};

export type ReadingGroupMembersResponse = {
  page: number;
  limit: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  total_page_count: number;
  members: ReadingGroupMember[];
};

// ===== API =====
export async function fetchReadingGroupOverview(groupId: number) {
  return api.get(`/reading-groups/${groupId}/overview`) as Promise<ReadingGroupOverview>;
}

export async function fetchReadingGroupMembers(
  groupId: number,
  params?: { page?: number; limit?: number },
) {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));

  const qs = query.toString();
  const url = qs
    ? `/reading-groups/${groupId}/members?${qs}`
    : `/reading-groups/${groupId}/members`;

  return api.get(url) as Promise<ReadingGroupMembersResponse>;
}

export async function patchMyProgress(
  groupId: number,
  body: { current_page: number; memo: string },
) {
  return api.patch(`/reading-groups/${groupId}/progress`, body) as Promise<unknown>;
}
