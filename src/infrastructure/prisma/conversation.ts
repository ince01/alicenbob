import { Conversation, conversations } from "entities";
import { CreateConversationPort } from "interfaces/persistence";

export const createConversation: CreateConversationPort = async (
  createConversationArgs
) => {
  const newConversation: Conversation = {
    id: Math.random().toString(),
    name: createConversationArgs.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  conversations.push(newConversation);

  return newConversation;
};
