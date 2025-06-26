import { Conversation, Id, AuditableEntity } from "entities";

export type CreateConversationArgs = Omit<
  Conversation,
  "id" | keyof AuditableEntity
>;

export interface CreateConversationPort {
  (createConversationArgs: CreateConversationArgs): Promise<Id>;
}

export type UpdateConversationArgs = {
  id: Id;
  name?: string;
  latestMessageId?: Id;
};

export interface UpdateConversationPort {
  (updateConversationArgs: UpdateConversationArgs): Promise<void>;
}

export type FindUniqueByConversationIdArgs = {
  conversationId: Id;
};

export interface FindUniqueByConversationIdPort {
  (
    findUniqueByConversationIdArgs: FindUniqueByConversationIdArgs
  ): Promise<Conversation | null>;
}
