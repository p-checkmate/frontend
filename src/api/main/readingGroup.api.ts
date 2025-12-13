// src/api/main/readingGroup.api.ts
import api from '@/api/api';

export type ReadingGroupProgress = {
  current_page: number;
  memo: string | null;
};

export type ReadingGroupOverview = {
  reading_group_id: number;
  title: string;
  member_count: number;
  days_left: number;
  total_days: number;
  total_pages: number;
  my_progress: ReadingGroupProgress | null; // 참여 안 했으면 null
};

export type ReadingGroupMembersResponse = {
  page: number;
  limit: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  total_page_count: number;
  members: Array<{
    member_id: number;
    user_id: number;
    nickname: string;
    level: 1 | 2 | 3 | 4 | 5;
    current_page: number;
    memo: string | null;
    is_current_user: boolean;
  }>;
};

// overview
export async function fetchReadingGroupOverview(
  groupId: number,
): Promise<ReadingGroupOverview> {
  return api.get(`/reading-groups/${groupId}/overview`);
}

// overview 병렬 조회 (실패한 것만 제외하고 반환)
export async function fetchReadingGroupsOverviews(
  groupIds: number[],
): Promise<ReadingGroupOverview[]> {
  const settled = await Promise.allSettled(
    groupIds.map((id) => fetchReadingGroupOverview(id)),
  );

  return settled
    .filter(
      (r): r is PromiseFulfilledResult<ReadingGroupOverview> =>
        r.status === 'fulfilled',
    )
    .map((r) => r.value);
}

// join
export async function joinReadingGroup(
  groupId: number,
): Promise<{ reading_group_id: number }> {
  return api.post(`/reading-groups/${groupId}/join`, {});
}

export async function fetchReadingGroupMembers(groupId: number) {
  return api.get<ReadingGroupMembersResponse>(`/reading-groups/${groupId}/members`);
}