import api from "../api";

export interface SignupRequest {
  email: string;
  password: string;
}
export interface SignupResponse {
  status: "success" | "error";
  data?: {
    accessToken: string;
    refreshToken: string;
    user: {
      user_id: number;
      email: string;
    };
  };
  error?: {
    message?: string;
    [key: string]: any;
  };
}

export const signup = (payload: SignupRequest): Promise<SignupResponse> => {
  return api.post("/auth/signup", payload) as Promise<SignupResponse>;
};
