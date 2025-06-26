import {
  ANNONYMOUS_USER_ID,
  ExecutionStatus,
  Id,
  MessageAuthor,
  MessageRole,
  ModelProvider,
} from "entities";
import { ChatCompletionPort } from "ports";
import { chatCompletion as openAiChatCompletion } from "infrastructure/openAi";
import { chatCompletion as anthropicChatCompletion } from "infrastructure/anthropic";
import {
  createExecution,
  createMessage,
  findUniqueByConversationId,
  findUniqueByModelId,
  updateConversation,
  updateExecutionStatus,
} from "infrastructure/prisma";

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
  conversationId,
  modelId,
  text,
}: StreamMessageArgs) => {
  const model = await findUniqueByModelId(modelId);

  if (!model) {
    throw new Error(`Model with id ${modelId} not found`);
  }

  const conversation = await findUniqueByConversationId({ conversationId });

  if (!conversation) {
    throw new Error(`Conversation with id ${conversationId} not found`);
  }

  const createdExecutionId = await createExecution({
    modelId,
    status: ExecutionStatus.Running,
    metadata: {},
  });

  const createdUserMessageId = await createMessage({
    parentId: conversation.latestMessageId,
    executionId: createdExecutionId,
    role: MessageRole.User,
    author: MessageAuthor.User,
    authorId: ANNONYMOUS_USER_ID,
    text,
  });

  await updateConversation({
    id: conversationId,
    latestMessageId: createdUserMessageId,
  });

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

  await updateExecutionStatus({
    id: createdExecutionId,
    status: ExecutionStatus.Completed,
  });

  const createdModelMessageId = await createMessage({
    executionId: createdExecutionId,
    parentId: createdUserMessageId,
    author: MessageAuthor.Model,
    role: chatCompletionResponse.message.role,
    text: chatCompletionResponse.message.text,
  });

  await updateConversation({
    id: conversationId,
    latestMessageId: createdModelMessageId,
  });

  return {
    ...chatCompletionResponse,
    message: {
      id: createdModelMessageId,
      parentId: createdUserMessageId,
      executionId: createdExecutionId,
      author: MessageAuthor.Model,
      ...chatCompletionResponse.message,
    },
  };
};
