export type Genre = {
  genreId: number;
  genreName: string;
};

export type BookDetail = {
  bookId: number;
  itemId: string;
  title: string;
  author: string;
  publisher: string;
  publishedDate: string;
  description: string;
  thumbnailUrl: string;
  page: number|null;
  genres: Genre[];
};