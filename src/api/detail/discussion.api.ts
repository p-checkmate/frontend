import api from '../api';

export type DiscussionType = 'FREE' | 'VS';

export interface Discussion {
  discussion_id: number;
  user_id: number;
  book_id: number;
  title: string;
  content: string;
  discussion_type: DiscussionType;
  option1: string | null;
  option2: string | null;
  created_at: string;
  nickname: string;
  like_count: number;
  comment_count: number;
}

export interface DiscussionMessage {
  comment_id: number;
  discussion_id: number;
  user_id: number;
  nickname: string;
  choice: number; // 1 | 2 | 0(자유토론) 등 백엔드에 따라
  content: string;
  created_at: string;
  updated_at: string;
}

export interface DiscussionMessageCreateRequest {
  content: string;
  choice?: number;
}

export interface DiscussionMessageCreateResponse {
  comment_id: number;
  exp_earned: number;
}

export interface DiscussionCreateRequest {
  title: string;
  content: string;
  discussion_type: DiscussionType;
  option1?: string;
  option2?: string;
}

export interface DiscussionCreateResponse {
  discussion_id: number;
}

export type BookDiscussionSummary = {
  discussion_id: number;
  title: string;
  content: string;
  discussion_type: 'FREE' | 'VS';
  option1: string | null;
  option2: string | null;
  created_at: string;
  nickname: string;
  like_count: number;
  comment_count: number;
};

// 토론 생성 API
export const createDiscussion = async (
  bookId: number | string,
  payload: DiscussionCreateRequest,
): Promise<DiscussionCreateResponse> => {
  return api.post(`/books/${bookId}/discussions`, payload) as unknown as DiscussionCreateResponse;
};

// 토론 상세
export const fetchDiscussionDetail = async (
  discussionId: number | string,
): Promise<Discussion> => {
  const res = await api.get(`/discussions/${discussionId}`);
  // api 인터셉터 형태/혹은 res 자체 형태 혼재 대응
  const data = (res as any)?.discussion ?? (res as any)?.data?.discussion;
  return data as Discussion;
};

// 메시지 목록 조회
export const fetchDiscussionMessages = async (
  discussionId: number | string,
): Promise<DiscussionMessage[]> => {
  const res = await api.get(`/discussions/${discussionId}/messages`);
  const messages = (res as any)?.messages ?? (res as any)?.data?.messages;
  return (messages ?? []) as DiscussionMessage[];
};

// 메시지 생성
export const createDiscussionMessage = async (
  discussionId: number | string,
  payload: DiscussionMessageCreateRequest,
): Promise<DiscussionMessageCreateResponse> => {
  const res = await api.post(`/discussions/${discussionId}/messages`, payload);
  return res as unknown as DiscussionMessageCreateResponse;
};

// 토론 목록
export const fetchBookDiscussion = async (
  bookId: number | string,
): Promise<BookDiscussionSummary[]> => {
  const res = await api.get(`/books/${bookId}/discussions`);
  const discussions = (res as any)?.discussions ?? (res as any)?.data?.discussions;
  return (discussions ?? []) as BookDiscussionSummary[];
};

// 좋아요
export const fetchDiscussionLikeStatus = async (discussionId: number): Promise<boolean> => {
  const res = await api.get(`/discussions/${discussionId}/like-status`);
  const body = (res as any)?.data ?? res;
  return (body?.isLiked ?? false) as boolean;
};

export const likeDiscussion = async (discussionId: number) => {
  return api.post(`/discussions/${discussionId}/like`);
};

export const unlikeDiscussion = async (discussionId: number) => {
  return api.delete(`/discussions/${discussionId}/like`);
};

// 토론 결과 투표
export const voteDiscussion = async (
  discussionId: number,
  choice: 1 | 2,
): Promise<{ message: string }> => {
  const res = await api.post(`/discussions/${discussionId}/vote`, { choice });
  return res as unknown as { message: string };
};

export type VoteStatusResponse = {
  is_voted: boolean;
  choice: 1 | 2 | null;
};

export const fetchDiscussionVoteStatus = async (
  discussionId: number,
): Promise<VoteStatusResponse> => {
  const res = await api.get(`/discussions/${discussionId}/vote-status`);
  return res as unknown as VoteStatusResponse;
};

// AI 요약 + 기본 메타
export type DiscussionSummary = {
  discussion_id: number;
  title: string;
  discussion_type: 'VS' | 'FREE';
  option1: string | null;
  option2: string | null;
  ended_at: string;
  total_comments: number;
  summary: string;
};

export const fetchDiscussionSummary = async (discussionId: number): Promise<DiscussionSummary> => {
  const res = await api.get(`/discussions/${discussionId}/summary`, { timeout: 30000 });
  return res as unknown as DiscussionSummary;
};

// 투표 통계/종료일
export type DiscussionVoteSummary = {
  vote1_count: number;
  vote2_count: number;
  option1_percentage: number;
  option2_percentage: number;
  end_date: string;
};

export const fetchDiscussionVoteSummary = async (
  discussionId: number,
): Promise<DiscussionVoteSummary> => {
  const res = await api.get(`/discussions/${discussionId}/vote`);
  return res as unknown as DiscussionVoteSummary;
};
