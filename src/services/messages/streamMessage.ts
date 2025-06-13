import { Id, MessageRole, ModelProvider } from "entities";
import { ChatCompletionPort } from "interfaces";
import { chatCompletion as openAiChatCompletion } from "infrastructure/openAi";
import { chatCompletion as anthropicChatCompletion } from "infrastructure/anthropic";
import { findUniqueByModelId } from "infrastructure/prisma";

const chatCompletionByModelProvider = (
  modelProvider: ModelProvider
): ChatCompletionPort => {
  if (modelProvider === ModelProvider.OpenAi) {
    return openAiChatCompletion;
  } else if (modelProvider === ModelProvider.Anthropic) {
    return anthropicChatCompletion;
  } else {
    throw new Error(`Unknown model provider: ${modelProvider}`);
  }
};

export type StreamMessageArgs = {
  conversationId: Id;
  modelId: Id;
  text: string;
};

export const streamMessage = async ({
  // conversationId,
  modelId,
  text,
}: StreamMessageArgs) => {
  const model = await findUniqueByModelId(modelId);

  if (!model) {
    throw new Error(`Model with id ${modelId} not found`);
  }

  const chatCompletionFn = chatCompletionByModelProvider(model.provider);

  const chatCompletionResponse = await chatCompletionFn({
    modelId,
    messages: [
      {
        role: MessageRole.User,
        text,
      },
    ],
  });

  return chatCompletionResponse;
};
