import api from '@/api/api';

export interface LikedQuoteItem {
  quote_id: number;
  content: string;
  like_count: number;
  created_at: string;
  book: {
    book_id: number;
    title: string;
    genres: string[];
  };
  user: {
    nickname: string;
  };
}

export interface LikedQuotesResponse {
  quotes: LikedQuoteItem[];
}

export const fetchLikedQuotes = async (): Promise<LikedQuotesResponse> => {
  return api.get('/users/like/quotes');
};

export interface LikedDiscussionItem {
  discussion_id: number;
  title: string;
  content: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  book: {
    book_id: number;
    title: string;
  };
  user: {
    nickname: string;
  };
}

export interface LikedDiscussionsResponse {
  discussions: LikedDiscussionItem[];
}

export const fetchLikedDiscussions = async (): Promise<LikedDiscussionsResponse> => {
  return api.get('/users/like/discussions');
};