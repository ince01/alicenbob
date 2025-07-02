export enum MessageAuthor {
  System = "system", // Current system
  User = "user", // Typically is the human user
  Model = "llm-model", // AI model like Claude Sonnet
  Application = "application", // The external application
}

export enum MessageRole {
  User = "user",
  Assistant = "assistant",
  Developer = "developer", // Like "developer" role in ChatGPT or "system" role (https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts) in Claude
}
