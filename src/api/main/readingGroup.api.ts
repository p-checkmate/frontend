// src/api/readingGroup.api.ts
import api from '@/api/api';


export type ReadingGroupOverview = {
  reading_group_id: number;
  title: string;
  member_count: number;
  days_left: number;
  total_pages: number;
  my_progress: {
    current_page: number;
    memo: string | null;
  } | null;
  thumbnail_url?: string;
};

export async function fetchReadingGroupOverview(
  groupId: number,
): Promise<ReadingGroupOverview> {
  if (groupId == null || Number.isNaN(groupId)) {
    throw new Error('유효하지 않은 reading_group_id 입니다.');
  }

  const data = (await api.get(
    `/reading-groups/${groupId}/overview`,
  )) as unknown as ReadingGroupOverview;

  return data;
}

export async function joinReadingGroup(groupId: number): Promise<void> {
  if (groupId == null || Number.isNaN(groupId)) {
    throw new Error('유효하지 않은 reading_group_id 입니다.');
  }
  await api.post(`/reading-groups/${groupId}/join`, {});
}
