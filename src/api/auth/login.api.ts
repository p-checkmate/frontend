import api from "../api";
import type { ApiResponse } from "@/types/ApiResponse"; // ApiResponse.ts 경로에 맞게 수정

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    user_id: number;
    email: string;
    nickname: string;
    profile_url: string;
  };
};

export const postLogin = (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  return api
    .post<ApiResponse<LoginResponse>>("/auth/login", payload)
    .then((result) => result as unknown as LoginResponse);
};
