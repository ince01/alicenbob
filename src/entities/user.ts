import { AuditableEntity, Id } from "./common";

export const ANNONYMOUS_USER_ID = "anonymous" as const;

export interface User extends AuditableEntity {
  id: Id;
  name: string;
  email: string;
}
