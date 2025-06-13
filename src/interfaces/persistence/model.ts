import { Model } from "entities";

export interface FindUniqueByModelIdPort {
  (modelId: string): Promise<Model | null>;
}
