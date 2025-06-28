import { Message, AuditableEntity, Id } from "entities";

export type CreateMessageArgs = Omit<Message, "id" | keyof AuditableEntity>;

export interface CreateMessagePort {
  (createMessageArgs: CreateMessageArgs): Promise<Id>;
}

export type FindMessagesByConversationIdArgs = {
  conversationId: Id;
};

export interface FindMessagesByConversationIdPort {
  (
    findByConversationIdArgs: FindMessagesByConversationIdArgs
  ): Promise<Message[]>;
}
