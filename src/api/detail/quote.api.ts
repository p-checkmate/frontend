import api from "../api";

export type QuoteDetail = {
  quote_id: number;
  user_id: number;
  nickname: string;
  book_id: number;
  content: string;
  like_count: number;
  created_at: string;
  updated_at: string | null;
};

// 인용구 목록 조회
export async function fetchQuotes(bookId: string | number) {
  return api.get(`/books/${bookId}/quotes`);
}

// 인용구 생성
export async function createQuote(bookId: string | number, content: string) {
  return api.post(`/books/${bookId}/quotes`, { content });
}

// 인용구 상세 조회
export async function fetchQuoteDetail(quoteId: number): Promise<QuoteDetail> {
  const data = await api.get<QuoteDetail>(`/quotes/${quoteId}`);
  return data as unknown as QuoteDetail;
}

//좋아요
export const likeQuote = async (quoteId: number) => {
  return api.post(`/quotes/${quoteId}/like`, {});
};

export const unlikeQuote = async (quoteId: number) => {
  return api.delete(`/quotes/${quoteId}/like`);
};

export const fetchQuoteLikeStatus = async (quoteId: number): Promise<boolean> => {
  const res = await api.get(`/quotes/${quoteId}/like-status`);
  return (res as any).liked as boolean;
};