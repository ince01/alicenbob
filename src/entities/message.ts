import { AuditableEntity, Id } from "./common";

export enum MessageAuthor {
  System = "system", // Current system
  User = "user", // Typically is the human user
  Model = "ai-model", // AI model like Claude Sonnet
  Application = "application", // The external application
}

export enum MessageRole {
  User = "user",
  Assistant = "assistant",
  Developer = "developer", // Like "developer" role in ChatGPT or "system" role (https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts) in Claude
}

export interface Message extends AuditableEntity {
  id: Id;
  parentId?: Id;
  author: MessageAuthor;
  authorId?: Id;
  executionId?: Id;
  role: MessageRole;
  text?: string;
  audioUrl?: string;
  audioTranscript?: string;
  metadata?: Record<string, unknown>;
}

// export const x = {
//   conversationId: "con_1",
//   role: "user",
//   latestMessageId: "mess_2",
//   messages: [
//     {
//       id: "mess_1",
//       parentId: null,
//       author: "user",
//       authorId: "usr_1",
//       role: "user",
//       contents: [
//         {
//           type: "text",
//           text: "Hello, world!",
//         },
//       ],
//     },
//     {
//       id: "mess_2",
//       parentId: "mess_1",
//       author: "ai-model",
//       authorid: "claude-3-7-sonnet-20250219",
//       role: "assistant",
//       contents: [
//         {
//           type: "text",
//           text: "Hi there!",
//         },
//       ],
//     },
//   ],
// };
