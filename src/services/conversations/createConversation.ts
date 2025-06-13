import { Conversation } from "entities";
import { createConversation as createConversationPrisma } from "infrastructure/prisma";

export type CreateConversationArgs = {
  name: string;
};

export const createConversation = async (
  createConversationArgs: CreateConversationArgs
): Promise<Conversation> => {
  return createConversationPrisma(createConversationArgs);
};
