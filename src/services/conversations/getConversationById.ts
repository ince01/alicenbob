import { Id } from "entities";
import {
  findMessagesByConversationId,
  findUniqueByConversationId,
} from "infrastructure/prisma";

export const getConversationById = async (conversationId: Id) => {
  const conversation = await findUniqueByConversationId({ conversationId });

  if (!conversation) {
    throw new Error(`Conversation with id ${conversationId} not found`);
  }

  const conversationMessages = await findMessagesByConversationId({
    conversationId,
  });

  return {
    ...conversation,
    messages: conversationMessages,
  };
};
