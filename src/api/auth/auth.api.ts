import api from "../api";

export interface SignupRequest {
  email: string;
  password: string;
}

export interface SignupData {
  accessToken: string;
  refreshToken: string;
  user: {
    userId: number;
    email: string;
  };
}

export const signup = (payload: SignupRequest): Promise<SignupData> => {
  return api.post("/auth/signup", payload);
};
