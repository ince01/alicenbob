import { Model, ModelProvider } from "entities";
import { FindUniqueByModelIdPort } from "ports/persistence";

export const _models: Model[] = [
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

export const findUniqueByModelId: FindUniqueByModelIdPort = async (modelId) => {
  const model = _models.find((model) => model.id === modelId);
  return model || null;
};
