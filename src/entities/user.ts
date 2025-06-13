import { AuditableEntity, Id } from "./common";

export interface User extends AuditableEntity {
  id: Id;
  name: string;
  email: string;
}
