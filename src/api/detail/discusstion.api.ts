import api from '../api';

export type DiscussionType = 'FREE' | 'VS';

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

export const createDiscussion = async (
  bookId: number | string,
  payload: DiscussionCreateRequest,
): Promise<DiscussionCreateResponse> => {
  return api.post(`/books/${bookId}/discussions`, payload);
};
