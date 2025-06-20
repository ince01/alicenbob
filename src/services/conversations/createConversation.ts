import { Conversation } from "entities";
import { createConversation as createConversationPrisma } from "infrastructure/prisma";

export type CreateConversationArgs = {
  name: string;
};

export const createConversation = async (
  createConversationArgs: CreateConversationArgs
): Promise<Pick<Conversation, "id">> => {
  const createdConversationId = await createConversationPrisma(
    createConversationArgs
  );
  return {
    id: createdConversationId,
  };
};
