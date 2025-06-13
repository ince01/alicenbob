import { Conversation } from "entities";

export type CreateConversationArgs = Pick<Conversation, "name">;

export interface CreateConversationPort {
  (createConversationArgs: CreateConversationArgs): Promise<Conversation>;
}
