import { AuditableEntity, Id } from "./common";

export interface Execution extends AuditableEntity {
  id: Id;
  modelId: Id;
  totalUsageTokens: number;
  inputTokens: number;
  outputTokens: number;
  metadata?: Record<string, unknown>;
}
