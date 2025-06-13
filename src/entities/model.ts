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

export const models: Model[] = [
  {
    id: "gpt-4.1-mini-2025-04-14",
    name: "GPT 4.1 Mini",
    provider: ModelProvider.OpenAi,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "claude-sonnet-4-20250514",
    name: "Claude Sonnet 4",
    provider: ModelProvider.Anthropic,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
