import api from "../api";

export type AIChatCreateResponse = {
  chatId: string;
  message: string;
};

export type AIChatMessageResponse = {
  message: string;
};

export const createAIChat = async (): Promise<AIChatCreateResponse> => {
  return api.post("/ai/chats");
};

export const sendAIChatMessage = async (
  chatId: string,
  message: string,
): Promise<AIChatMessageResponse> => {
  return api.post(`/ai/chats/${chatId}`, { message });
};
