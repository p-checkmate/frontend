import api from '@/api/api';

// 책 북마크 생성 (POST /api/v1/books/{bookId}/bookmark)
export const createBookBookmark = async (bookId: number | string) => {
  return api.post(`/books/${bookId}/bookmark`, {});
};

// 책 북마크 삭제 (DELETE /api/v1/books/{bookId}/bookmark)
export const deleteBookBookmark = async (bookId: number | string) => {
  return api.delete(`/books/${bookId}/bookmark`);
};

export const fetchBookBookmarkStatus = async (
  bookId: string | number,
): Promise<boolean> => {
  const data = await api.get(`/books/${bookId}/bookmark`);

  return (data as unknown as { isBookmarked: boolean }).isBookmarked;
};