export const AI_COMMIT_CONFIG = {
  // AI Model Settings
  openai: {
    model: "gpt-4o-mini",
    maxTokens: 100,
    temperature: 0.3,
  },
  anthropic: {
    model: "claude-3-5-sonnet-20241022",
    maxTokens: 100,
    temperature: 0.3,
  },
  gemini: {
    model: "gemini-1.5-flash",
    maxTokens: 100,
    temperature: 0.3,
  },

  // Prompt Customization
  prompt: {
    systemMessage:
      "You are an expert software developer who writes clear, concise commit messages following conventional commit standards.",

    // Customize the prompt template
    template: `You are an expert software developer. Analyze the following Git changes and generate a conventional commit message.

CONVENTIONAL COMMIT FORMAT:
<type>(<scope>): <description>

TYPES:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (formatting, etc.)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests or correcting existing tests
- build: Changes that affect the build system or external dependencies
- ci: Changes to CI configuration files and scripts
- chore: Other changes that don't modify src or test files

SCOPES (for this monorepo):
- server: Server application changes
- web: Web application changes
- shared: Shared packages
- deps: Dependencies
- docs: Documentation
- config: Configuration files

RULES:
1. Use imperative mood ("add" not "added")
2. Keep description under 50 characters
3. Don't capitalize first letter
4. No period at the end
5. Be specific about what changed
6. Focus on the "what" and "why" of the change

FILES CHANGED:
- {fileList}

GIT DIFF:
{diffSummary}

Generate a conventional commit message that accurately describes these changes:`,

    // Additional context you want to include
    additionalContext: {
      projectType: "monorepo",
      techStack: ["TypeScript", "React", "Node.js", "Express"],
      conventions: "conventional commits",
    },
  },

  // File filtering
  files: {
    // Files to ignore when generating commit messages
    ignore: [
      "yarn.lock",
      "package-lock.json",
      "pnpm-lock.yaml",
      ".DS_Store",
      "*.log",
      "dist/",
      "build/",
      "node_modules/",
    ],

    // Maximum number of files to include in the prompt
    maxFiles: 20,

    // Maximum diff size per file (in characters)
    maxDiffSize: 5000,
  },

  // Commit message validation
  validation: {
    // Maximum length for commit message
    maxLength: 72,

    // Required format regex
    formatRegex:
      /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?: .{1,50}$/,

    // Forbidden words in commit messages
    forbiddenWords: ["WIP", "TODO", "FIXME", "HACK"],
  },

  // Error handling
  errorHandling: {
    // Fallback to pattern-based commit if AI fails
    fallbackToPattern: true,

    // Show detailed error messages
    verbose: true,

    // Retry attempts for API calls
    maxRetries: 3,
  },

  // UI/UX settings
  ui: {
    // Show progress indicators
    showProgress: true,

    // Colors for terminal output
    colors: {
      success: "green",
      error: "red",
      warning: "yellow",
      info: "blue",
    },

    // Emojis for different states
    emojis: {
      analyzing: "🔍",
      generating: "🧠",
      success: "✅",
      error: "❌",
      warning: "⚠️",
      info: "ℹ️",
    },
  },
};

export default AI_COMMIT_CONFIG;
