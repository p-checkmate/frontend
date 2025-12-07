import api from "../api";

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

export interface BestsellerResponse {
  status: "success" | "error";
  data: BestsellerData;
}

export const fetchBestsellers = async (): Promise<BestsellerData> => {
  const res = (await api.get("/books/bestsellers")) as BestsellerResponse;
  return res.data;
};
export interface FavoriteBooksRequest {
  itemIds: number[];
}

export interface FavoriteBooksResponse {
  status: "success" | "error";
  data: {
    bookmarkIds: number[];
  };
}

export const postFavoriteBooks = async (
  itemIds: number[],
): Promise<number[]> => {
  const res = (await api.post("/onboarding/favorite-books", {
    itemIds,
  })) as FavoriteBooksResponse;

  return res.data.bookmarkIds;
};