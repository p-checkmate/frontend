import api from "../api";


export interface FavoriteGenresResponse {
  genreIds: number[];
}

export interface FavoriteBooksResponse {
  bookmarkIds: number[];
}

export const postFavoriteGenres = async (
  genreIds: number[],
): Promise<FavoriteGenresResponse> => {
  const res = await api.post<FavoriteGenresResponse>(
    "/onboarding/favorite-genres",
    {
      genreIds,
    },
  );
  return res as unknown as FavoriteGenresResponse;
};
