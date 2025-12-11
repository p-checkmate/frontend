import api from "../api";

export interface MyPageUser {
  user_id: number;
  nickname: string;
  email: string;
  exp: number;
  level: number;
  preferred_genres: string[];
}

export interface MyPageBookItem {
  book_id: number;
  item_id: number;
  title: string;
  author: string;
  thumbnail_url: string;
}

export interface MyPageResponse {
  user: MyPageUser;
  my_bookshelf: MyPageBookItem[];
}

// API 요청
export const fetchMyPage = async (): Promise<MyPageResponse> => {
  return api.get("/users/mypage");
};
