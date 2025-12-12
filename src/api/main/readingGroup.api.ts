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
  total_pages: number;
  my_progress: ReadingGroupProgress | null; // 참여 안 했으면 null
};

// ✅ 단일 overview
export async function fetchReadingGroupOverview(
  groupId: number,
): Promise<ReadingGroupOverview> {
  return api.get(`/reading-groups/${groupId}/overview`);
}

// ✅ 여러 개 overview 병렬 조회 (실패한 것만 제외하고 반환)
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

// ✅ join
export async function joinReadingGroup(
  groupId: number,
): Promise<{ reading_group_id: number }> {
  return api.post(`/reading-groups/${groupId}/join`, {});
}
