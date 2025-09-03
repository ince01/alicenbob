import { Execution, AuditableEntity, Id } from "entities";

export type CreateExecutionArgs = Omit<Execution, "id" | keyof AuditableEntity>;

export interface CreateExecutionPort {
  (createExecutionArgs: CreateExecutionArgs): Promise<Id>;
}

export type UpdateExecutionArgs = Pick<
  Execution,
  "id" | "status" | "totalUsageTokens" | "inputTokens" | "outputTokens"
>;

export interface UpdateExecutionStatusPort {
  (updateExecutionArgs: UpdateExecutionArgs): Promise<void>;
}
