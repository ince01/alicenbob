import { models } from "entities";
import { FindUniqueByModelIdPort } from "interfaces/persistence";

export const findUniqueByModelId: FindUniqueByModelIdPort = async (modelId) => {
  const model = models.find((model) => model.id === modelId);
  return model || null;
};
