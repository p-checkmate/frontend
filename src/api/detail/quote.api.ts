import api from "../api";

// 인용구 조회
export async function fetchQuotes(bookId: string | number) {
  return api.get(`/books/${bookId}/quotes/get`);
}

// 인용구 생성
export async function createQuote(bookId: string | number, content: string) {
  return api.post(`/books/${bookId}/quotes/post`, { content });
}
