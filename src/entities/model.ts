import { AuditableEntity, Id } from "./common";

export enum ModelProvider {
  OpenAi = "openai",
  Anthropic = "anthropic",
}

export interface Model extends AuditableEntity {
  id: Id;
  name: string;
  provider: ModelProvider;
}
