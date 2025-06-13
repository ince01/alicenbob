import { Message } from "entities";

export type ChatCompletionMessageInput = Required<
  Pick<Message, "role" | "text">
>;

export type ChatCompletionArgs = {
  model: string;
  messages: ChatCompletionMessageInput[];
};

export type ChatCompletionMessageOutput = Required<
  Pick<Message, "role" | "text">
>;

export type ChatCompletionOutput = {
  model: string;
  message: ChatCompletionMessageOutput;
  usage: {
    totalTokens: number;
    inputTokens: number;
    outputTokens: number;
  };
};

export interface ChatCompletionPort {
  (chatCompletionArgs: ChatCompletionArgs): Promise<ChatCompletionOutput>;
}
