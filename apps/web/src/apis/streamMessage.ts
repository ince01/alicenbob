import { httpClient } from "./httpClient";

type StreamMessageArgs = {
  conversationId: string;
  modelId: string;
  text: string;
};

export const streamMessage = async (streamMessageArgs: StreamMessageArgs) => {
  const url = `/conversations/${streamMessageArgs.conversationId}/messages/stream`;
  const response = await httpClient.post(url, streamMessageArgs);
  return response;
};
