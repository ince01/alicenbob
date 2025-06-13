import { ChatCompletionPort } from "interfaces";
import { MessageRole } from "entities";
import {
  MessageParam,
  TextBlockParam,
} from "@anthropic-ai/sdk/resources/messages";
import { anthropicClient } from "./anthropicClient";
import { mapMessageRoleToAnthropicRole } from "./utils";

export const chatCompletion: ChatCompletionPort = async ({
  modelId,
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
    model: modelId,
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

  const inputTokens =
    createdMessage.usage.input_tokens +
    (createdMessage.usage.cache_creation_input_tokens ?? 0) +
    (createdMessage.usage.cache_read_input_tokens ?? 0);
  const outputTokens = createdMessage.usage.output_tokens;
  const totalTokens = inputTokens + outputTokens;

  return {
    model: modelId,
    message: {
      role: MessageRole.Assistant,
      text: outputText,
    },
    usage: {
      totalTokens,
      inputTokens,
      outputTokens,
    },
  };
};
