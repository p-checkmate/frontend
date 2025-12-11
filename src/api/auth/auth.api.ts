import api from "../api";

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface SignupData {
  accessToken: string;
  refreshToken: string;
  user: {
    user_id: number;
    email: string;
    nickname: string;
    profile_url:string
  };
}

export const signup = (payload: SignupRequest): Promise<SignupData> => {
  return api.post("/auth/signup", payload);
};
