import api from '../api';

// =======================
// 내가 작성한 인용구
// =======================
export interface MyQuoteBook {
  book_id: number;
  title: string;
  genres: string[];
}

export interface MyQuoteUser {
  nickname: string;
}

export interface MyQuoteItem {
  quote_id: number;
  content: string;
  like_count: number;
  created_at: string;
  book: MyQuoteBook;
  user: MyQuoteUser;
}

export interface MyQuotesResponse {
  page: number;
  limit: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  quotes: MyQuoteItem[];
}

export const fetchMyQuotes = async (): Promise<MyQuotesResponse> => {
  const data = await api.get('/users/my-quotes');
  return data as unknown as MyQuotesResponse;
};

// =======================
// 내가 작성한 토론
// =======================
export interface MyDiscussionBook {
  book_id: number;
  title: string;
}

export interface MyDiscussionUser {
  nickname: string;
}

export interface MyDiscussionItem {
  discussion_id: number;
  title: string;
  content: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  book: MyDiscussionBook;
  user: MyDiscussionUser;
}

export interface MyDiscussionsResponse {
  page: number;
  limit: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  discussions: MyDiscussionItem[];
}

export const fetchMyDiscussions = async (): Promise<MyDiscussionsResponse> => {
  const data = await api.get('/users/my-discussions');
  return data as unknown as MyDiscussionsResponse;
};

// =======================
// 내가 좋아요 한 인용구
// =======================
export interface LikedQuoteItem {
  quote_id: number;
  content: string;
  like_count: number;
  created_at: string;
  book: MyQuoteBook;
  user: MyQuoteUser;
}

export interface LikedQuotesResponse {
  page: number;
  limit: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  quotes: LikedQuoteItem[];
}

export const fetchLikedQuotes = async (): Promise<LikedQuotesResponse> => {
  const data = await api.get('/users/like/quotes');
  return data as unknown as LikedQuotesResponse;
};

// =======================
// 내가 좋아요 한 토론
// =======================
export interface LikedDiscussionItem {
  discussion_id: number;
  title: string;
  content: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  book: MyDiscussionBook;
  user: MyDiscussionUser;
}

export interface LikedDiscussionsResponse {
  page: number;
  limit: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  discussions: LikedDiscussionItem[];
}

export const fetchLikedDiscussions = async (): Promise<LikedDiscussionsResponse> => {
  const data = await api.get('/users/like/discussions');
  return data as unknown as LikedDiscussionsResponse;
};
