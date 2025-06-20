import { Conversation } from "entities";
import {
  CreateConversationPort,
  FindUniqueByConversationIdPort,
  UpdateConversationPort,
} from "interfaces/persistence";

export const _conversations: Conversation[] = [
  {
    id: "123",
    name: "First conversation",
    createdAt: "2025-06-20T07:52:28.865Z",
    updatedAt: "2025-06-20T07:52:45.708Z",
    latestMessageId: "0.039909429040857036",
  },
];

export const createConversation: CreateConversationPort = async (
  createConversationArgs
) => {
  const id = Math.random().toString();

  const newConversation: Conversation = {
    id,
    name: createConversationArgs.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  _conversations.push(newConversation);

  return id;
};

export const findUniqueByConversationId: FindUniqueByConversationIdPort =
  async ({ conversationId }) => {
    const conversation = _conversations.find(({ id }) => id === conversationId);

    if (!conversation) {
      return null;
    }

    return conversation;
  };

export const updateConversation: UpdateConversationPort = async (
  updateConversationArgs
) => {
  const conversation = _conversations.find(
    ({ id }) => id === updateConversationArgs.id
  );

  if (!conversation) {
    throw new Error(
      `Conversation with id ${updateConversationArgs.id} not found`
    );
  }

  if (updateConversationArgs.name) {
    conversation.name = updateConversationArgs.name;
  }

  if (updateConversationArgs.latestMessageId) {
    conversation.latestMessageId = updateConversationArgs.latestMessageId;
  }

  conversation.updatedAt = new Date().toISOString();
};
