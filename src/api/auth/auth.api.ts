import api from "../api";
import type { ApiResponse } from "@/types/ApiResponse";

export interface SignupRequest {
  email: string;
  password: string;
}

export interface SignupData {
  accessToken: string;
  refreshToken: string;
  user: {
    user_id: number;
    email: string;
  };
}

export const signup = (payload: SignupRequest) => {
  return api.post<ApiResponse<SignupData>>("/auth/signup", payload);
};
