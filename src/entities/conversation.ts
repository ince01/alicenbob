import { AuditableEntity } from "./common";

export interface Conversation extends AuditableEntity {
  id: string;
  name: string;
}
