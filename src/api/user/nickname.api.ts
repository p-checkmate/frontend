import api from "../api";

export const updateNickname = (nickname: string) => {
  return api.patch("/users/me", { nickname });
};
