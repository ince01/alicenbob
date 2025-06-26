import { AuditableEntity, Id } from "./common";

export interface Application extends AuditableEntity {
  id: Id;
  name: string;
}
