import { AuditableEntity, Id } from "./common";

export enum ExecutionStatus {
  Pending = "pending",
  Running = "running",
  Completed = "completed",
  Failed = "failed",
}

export interface Execution extends AuditableEntity {
  id: Id;
  modelId: Id;
  status: ExecutionStatus;
  totalUsageTokens?: number;
  inputTokens?: number;
  outputTokens?: number;
  metadata?: Record<string, unknown>;
}
