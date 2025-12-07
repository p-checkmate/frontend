import api from "../api";

// =======================
//  베스트셀러 데이터 타입
// =======================
export interface BookItem {
  itemId: number;
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  description: string;
  isbn13: string;
  cover: string;
  categoryNames: string[];
}

export interface BestsellerData {
  totalResults: number;
  startIndex: number;
  hasMore: boolean;
  itemsPerPage: number;
  items: BookItem[];
}

export const fetchBestsellers = async (): Promise<BestsellerData> => {
  return api.get("/books/bestsellers");
};

// =======================
//  즐겨찾기 등록
// =======================
export interface FavoriteBooksRequest {
  itemIds: number[];
}

export interface FavoriteBooksData {
  bookmarkIds: number[];
}

export const postFavoriteBooks = async (
  itemIds: number[],
): Promise<FavoriteBooksData> => {
  return api.post("/onboarding/favorite-books", { itemIds });
};
