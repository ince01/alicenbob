import { ChatCompletionPort } from "interfaces/inbound";
import { MessageRole } from "entities";
import {
  MessageParam,
  TextBlockParam,
} from "@anthropic-ai/sdk/resources/messages";
import { anthropicClient } from "./anthropicClient";
import { mapMessageRoleToAnthropicRole } from "./utils";

export const chatCompletion: ChatCompletionPort = async ({
  model,
  messages,
}) => {
  const system: TextBlockParam[] = messages
    .filter(({ role }) => role === MessageRole.Developer)
    .map(({ text }) => ({
      type: "text",
      text,
    }));

  const inputMessages: MessageParam[] = messages
    .filter(({ role }) => role !== MessageRole.Developer)
    .map<MessageParam>(({ role, text }) => ({
      role: mapMessageRoleToAnthropicRole(role),
      content: text,
    }));

  const createdMessage = await anthropicClient.messages.create({
    model,
    max_tokens: 4096, // Ref: https://docs.anthropic.com/en/docs/about-claude/models/overview#model-comparison-table
    system,
    messages: inputMessages,
  });

  const outputText = createdMessage.content.reduce(
    (tmpOutputText, currentContentBlock) => {
      return currentContentBlock.type === "text"
        ? `${tmpOutputText}\n\n${currentContentBlock.text}`
        : tmpOutputText;
    },
    ""
  );

  return {
    model,
    message: {
      role: MessageRole.Assistant,
      text: outputText,
    },
    usage: {
      totalTokens: 0,
      inputTokens: 0,
      outputTokens: 0,
    },
  };
};
