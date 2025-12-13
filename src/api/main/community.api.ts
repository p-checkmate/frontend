// src/api/main/community.api.ts
import api from '@/api/api';

// ===== Types =====
export type DiscussionItem = {
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
};

export type QuoteItem = {
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
};

function unwrap<T>(res: any): T {
  return (res?.data ?? res) as T;
}

// ===== API =====
export async function fetchDiscussions(): Promise<DiscussionItem[]> {
  const res = await api.get('/discussions');
  const data = unwrap<{ discussions?: DiscussionItem[] }>(res);
  return data.discussions ?? [];
}

export async function fetchQuotes(): Promise<QuoteItem[]> {
  const res = await api.get('/quotes');
  const data = unwrap<{ quotes?: QuoteItem[] }>(res);
  return data.quotes ?? [];
}
