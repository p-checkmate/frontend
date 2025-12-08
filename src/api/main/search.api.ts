import api from "../api";

export type BookSearchItem = {
  itemId: number;
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  description: string;
  isbn13: string;
  cover: string;
  categoryNames: string[];
};

export type BookSearchResponse = {
  totalResults: number;
  startIndex: number;
  hasMore: boolean;
  itemsPerPage: number;
  items: BookSearchItem[];
};

export const searchBooks = async (
  q: string,
  start = 1,
  maxResults = 30,
): Promise<BookSearchResponse> => {
  if (!q.trim()) {
    return {
      totalResults: 0,
      startIndex: 0,
      hasMore: false,
      itemsPerPage: maxResults,
      items: [],
    };
  }

  const data = await api.get("/books/search", {
    params: {
      q,
      start,
      maxResults,
    },
  });

  return data as unknown as BookSearchResponse;
};
