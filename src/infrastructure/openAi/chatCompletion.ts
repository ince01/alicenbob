import { ChatCompletionPort } from "interfaces";
import { ResponseInput } from "openai/resources/responses/responses";
import { openAiClient } from "./openAiClient";
import { MessageRole } from "entities";

export const chatCompletion: ChatCompletionPort = async ({
  modelId,
  messages,
}) => {
  /**
   * Converts messages to ResponseInput format, placing Developer messages first.
   * Ref: https://model-spec.openai.com/2025-02-12.html#chain_of_command
   */
  const input: ResponseInput = messages
    .sort(({ role }) => (role === MessageRole.Developer ? -1 : 1))
    .map(({ role, text }) => ({
      role,
      content: text,
    }));

  const response = await openAiClient.responses.create({
    model: modelId,
    input,
  });

  return {
    model: modelId,
    message: {
      role: MessageRole.Assistant,
      text: response.output_text,
    },
    usage: {
      totalTokens: response.usage?.total_tokens ?? 0,
      inputTokens: response.usage?.input_tokens ?? 0,
      outputTokens: response.usage?.output_tokens ?? 0,
    },
  };
};
