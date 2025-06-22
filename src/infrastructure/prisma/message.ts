import { Message, MessageAuthor, MessageRole } from "entities";
import {
  CreateMessagePort,
  FindMessagesByConversationIdPort,
} from "ports/persistence";
import { _conversations } from "./conversation";

export const _messages: Message[] = [
  {
    id: "0.6491976091859653",
    executionId: "0.892037673454533",
    role: MessageRole.User,
    author: MessageAuthor.User,
    authorId: "anonymous",
    text: "Hi, who are you?",
    createdAt: "2025-06-20T07:52:42.632Z",
    updatedAt: "2025-06-20T07:52:42.632Z",
  },
  {
    id: "0.039909429040857036",
    parentId: "0.6491976091859653",
    executionId: "0.892037673454533",
    role: MessageRole.Assistant,
    author: MessageAuthor.Model,
    text: "\n\nHi! I'm Claude, an AI assistant created by Anthropic. I'm here to help with a wide variety of tasks like answering questions, helping with analysis and research, creative projects, math and coding, or just having a conversation. What would you like to chat about or how can I assist you today?",
    createdAt: "2025-06-20T07:52:45.708Z",
    updatedAt: "2025-06-20T07:52:45.708Z",
  },
];

export const createMessage: CreateMessagePort = async ({
  parentId,
  executionId,
  role,
  author,
  authorId,
  text,
}) => {
  const id = Math.random().toString();

  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  _messages.push({
    id,
    parentId,
    executionId,
    role,
    author,
    authorId,
    text,
    createdAt,
    updatedAt,
  });

  return id;
};

export const findMessagesByConversationId: FindMessagesByConversationIdPort =
  async ({ conversationId }) => {
    const conversation = _conversations.find(({ id }) => id === conversationId);

    if (!conversation) {
      throw new Error(`Conversation with id ${conversationId} not found`);
    }

    let latestMessageId = conversation.latestMessageId;
    const messages: Message[] = [];

    while (latestMessageId) {
      const tmpLatestMessage = _messages.find(
        ({ id }) => id === latestMessageId
      );

      if (!tmpLatestMessage) {
        throw new Error(`Message with id ${tmpLatestMessage} not found`);
      }

      latestMessageId = tmpLatestMessage.parentId;
      messages.push(tmpLatestMessage);
    }

    return messages;
  };
