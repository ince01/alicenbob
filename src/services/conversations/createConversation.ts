import { Conversation } from "entities/conversation";

export type CreateConversationArgs = {
  name: string;
};

export const createConversation = async (
  args: CreateConversationArgs
): Promise<Conversation> => {
  const currentDate = new Date().toISOString();
  return {
    id: Math.random().toString(),
    name: args.name,
    createdAt: currentDate,
    updatedAt: currentDate,
  };
};
