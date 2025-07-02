import type { AxiosResponse } from "axios";
import { httpClient } from "./httpClient";
import type { MessageAuthor } from "@/types";

export const getMessagesByConversationId = async (
  conversationId: string
): Promise<
  AxiosResponse<{
    id: string;
    name: string;
    latestMessageId?: string;
    messages: {
      id: string;
      parentId?: string;
      author: MessageAuthor;
      text: string;
    }[];
  }>
> => {
  const url = `/conversations/${conversationId}`;
  const response = await httpClient.get(url);
  return response;
};
