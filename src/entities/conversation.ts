import { AuditableEntity, Id } from "./common";

export interface Conversation extends AuditableEntity {
  id: Id;
  name: string;
  latestMessageId?: Id;
}
