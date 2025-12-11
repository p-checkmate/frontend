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
  choice: number;
  content: string;
  created_at: string;
  updated_at: string;
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

//토론 생성 API
export const createDiscussion = async (
  bookId: number | string,
  payload: DiscussionCreateRequest,
): Promise<DiscussionCreateResponse> => {
  return api.post(`/books/${bookId}/discussions`, payload);
};

export const fetchDiscussionDetail = async (
  discussionId: number | string,
): Promise<Discussion> => {
  const res = await api.get(`/discussions/${discussionId}`);

  const data = res as unknown as { discussion: Discussion };

  return data.discussion;
};

//메시지 목록 조회
export const fetchDiscussionMessages = async (
  discussionId: number | string,
): Promise<DiscussionMessage[]> => {
  const res = await api.get(`/discussions/${discussionId}/messages`);
  const data = res as unknown as { messages: DiscussionMessage[] };
  return data.messages;
};