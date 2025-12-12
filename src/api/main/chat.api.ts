import api from "../api";

export type AIChatCreateResponse = {
  chatId: string;
  message: string;
};

export type AIChatMessageResponse = {
  message: string;
};

export const createAIChat = async (): Promise<AIChatCreateResponse> => {
  const res = await api.post("/ai/chats", {}, { timeout: 30000 });

  return res as unknown as AIChatCreateResponse;
};

export const sendAIChatMessage = async (
  chatId: string,
  message: string,
): Promise<AIChatMessageResponse> => {
  const res = await api.post(
    `/ai/chats/${chatId}`,
    { message },
    { timeout: 30000 },
  );

  return res as unknown as AIChatMessageResponse;
};
