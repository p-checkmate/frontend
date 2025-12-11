// src/api/mypage/mybook.api.ts
import api from '../api';

export interface MyBookBookmark {
  bookmark_id: number;
  book_id: number;
  item_id: number;
  title: string;
  author: string;
  thumbnail_url: string;
  genres: string[];
}

export interface MyBookResponse {
  page: number;
  limit: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  bookmarks: MyBookBookmark[];
}

// 나의 책장 목록 조회
export const fetchMyBookBookmarks = async (): Promise<MyBookResponse> => {
  return api.get('/users/bookmarks/books');
};

// ✅ 북마크 삭제: itemId를 사용해 보자
export const deleteBookmark = async (itemId: number): Promise<void> => {
  await api.delete(`/books/${itemId}/bookmark`);
};
