import { MessageParam } from "@anthropic-ai/sdk/resources/messages";
import { MessageRole } from "entities";

export const mapMessageRoleToAnthropicRole = (
  messageRole: MessageRole
): MessageParam["role"] =>
  messageRole === MessageRole.User ? "user" : "assistant";
