import { AuditableEntity, Id } from "./common";

export interface Conversation extends AuditableEntity {
  id: Id;
  name: string;
  latestMessageId?: Id;
}

export const conversations: Conversation[] = [
  {
    id: Math.random().toString(),
    name: "First conversation",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
