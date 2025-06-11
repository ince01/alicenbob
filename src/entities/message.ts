import { AuditableEntity } from "./common";

export type AudioMessage = {
  url: string;
  transcript: string;
};

export type TextMessage = {
  text: string;
};

export interface Message<T = TextMessage | AudioMessage>
  extends AuditableEntity {
  id: string;
  conversationId: string;
  message: T;
}
