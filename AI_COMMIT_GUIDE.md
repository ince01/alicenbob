# AI-Powered Commit Messages 🤖

This monorepo now includes **AI-powered commit message generation** using Large Language Models (LLMs) to create intelligent, context-aware commit messages.

## 🚀 Quick Start

```bash
# Stage your changes
git add .

# Use AI-powered commit (recommended)
yarn commit:ai

# Or use Git alias
git ai-commit
```

## 🤖 How It Works

The AI commit generator:

1. **Analyzes** your staged files and their diffs
2. **Understands** the context and purpose of changes
3. **Generates** meaningful commit messages using LLMs
4. **Validates** the message format
5. **Confirms** with you before committing

## 📋 Available Commands

### AI-Powered Commits

```bash
yarn commit:ai          # AI-powered commit with LLM
git ai-commit          # Same as yarn commit:ai
```

### Pattern-Based Commits (Fallback)

```bash
yarn commit:smart       # Pattern-based auto-commit
git ac                 # Same as yarn commit:smart
```

### Interactive Commits

```bash
yarn commit            # Interactive commitizen
git cz                 # Same as yarn commit
```

## 🔧 Setup

### 1. Install Dependencies

```bash
yarn install
```

### 2. Set Up Git Aliases

```bash
./scripts/setup-git-aliases.sh
```

### 3. Configure AI API Keys

Create a `.env` file in your project root:

```bash
# For OpenAI (GPT-4)
OPENAI_API_KEY=your_openai_api_key_here

# For Anthropic (Claude)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# For Google Gemini
GEMINI_API_KEY=your_gemini_api_key_here
```

**Note**: You only need one API key. The system will use OpenAI if available, otherwise Anthropic, then Gemini.

## 🎯 AI Models Used

### OpenAI

- **Model**: `gpt-4o-mini`
- **Features**: Fast, cost-effective, good understanding of code
- **Best for**: Quick commits, cost-conscious users

### Anthropic

- **Model**: `claude-3-5-sonnet-20241022`
- **Features**: Excellent reasoning, detailed analysis
- **Best for**: Complex changes, detailed commit messages

### Google Gemini

- **Model**: `gemini-1.5-flash`
- **Features**: Fast, efficient, good code understanding
- **Best for**: Quick commits, Google ecosystem users

## 📝 What the AI Analyzes

### File Types

- Source code files (`.js`, `.ts`, `.tsx`, `.jsx`)
- Configuration files (`.json`, `.yaml`, `.yml`)
- Documentation (`.md`, `.txt`)
- Package files (`package.json`, `yarn.lock`)

### Change Patterns

- **Additions**: New files, new functions, new features
- **Modifications**: Bug fixes, improvements, refactoring
- **Deletions**: Code cleanup, feature removal
- **Dependencies**: Package updates, new libraries

### Context Understanding

- **Monorepo structure**: Understands `apps/server/`, `apps/web/`, etc.
- **File relationships**: Knows which files are related
- **Change impact**: Assesses the scope and impact of changes

## 🔍 Examples

### Feature Addition

```bash
# Adding new authentication feature
git add apps/server/src/features/auth.ts
yarn commit:ai
# → feat(server): add user authentication with JWT tokens
```

### Bug Fix

```bash
# Fixing a database connection issue
git add apps/server/src/database/connection.ts
yarn commit:ai
# → fix(server): resolve database connection timeout issue
```

### Documentation Update

```bash
# Updating README and docs
git add README.md docs/
yarn commit:ai
# → docs: update project documentation and setup guide
```

### Dependency Update

```bash
# Updating packages
git add package.json yarn.lock
yarn commit:ai
# → build(deps): update dependencies to latest versions
```

## ⚙️ Configuration

The AI commit generator is highly configurable. Edit `scripts/ai-commit-config.js`:

### AI Model Settings

```javascript
openai: {
  model: 'gpt-4o-mini',
  maxTokens: 100,
  temperature: 0.3,
},
anthropic: {
  model: 'claude-3-5-sonnet-20241022',
  maxTokens: 100,
  temperature: 0.3,
},
gemini: {
  model: 'gemini-1.5-flash',
  maxTokens: 100,
  temperature: 0.3,
}
```

### File Filtering

```javascript
files: {
  ignore: ['yarn.lock', '*.log', 'dist/'],
  maxFiles: 20,
  maxDiffSize: 5000,
}
```

### Validation Rules

```javascript
validation: {
  maxLength: 72,
  formatRegex: /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?: .{1,50}$/,
  forbiddenWords: ['WIP', 'TODO', 'FIXME'],
}
```

## 🛡️ Error Handling

### Automatic Fallback

If AI generation fails, the system automatically falls back to pattern-based commit generation.

### Retry Logic

- **Max retries**: 3 attempts
- **Exponential backoff**: 1s, 2s, 3s delays
- **Graceful degradation**: Falls back to pattern-based if all retries fail

### Common Issues

**No API Key**

```bash
❌ Error: No AI API key found
�� Set OPENAI_API_KEY, ANTHROPIC_API_KEY, or GEMINI_API_KEY in .env
```

**API Rate Limits**

```bash
🔄 Retry attempt 1/3...
🔄 Retry attempt 2/3...
🔄 Falling back to pattern-based commit generation...
```

**Network Issues**

```bash
❌ OpenAI API error: Network timeout
🔄 Falling back to pattern-based commit generation...
```

## 🔄 Workflow Integration

### With Existing Hooks

The AI commit generator works seamlessly with your existing commit hooks:

1. **Pre-commit**: Runs lint-staged (formatting, linting)
2. **AI Generation**: Creates intelligent commit message
3. **Commit-msg**: Validates conventional commit format
4. **Pre-push**: Runs tests and full linting

### Development Workflow

```bash
# 1. Make changes
# 2. Stage files
git add .

# 3. AI-powered commit
yarn commit:ai

# 4. Confirm message (y/n/e for edit)
# 5. Push when ready
git push
```

## 💡 Tips & Best Practices

### For Best Results

- **Stage related changes together**: Don't mix features and fixes
- **Use descriptive branch names**: Helps AI understand context
- **Keep changes focused**: Smaller, focused commits work better

### When to Use Each Tool

- **`yarn commit:ai`**: Most commits, when you want intelligent messages
- **`yarn commit:smart`**: Quick commits, when AI is unavailable
- **`yarn commit`**: Complex commits, when you need full control

### Cost Optimization

- **OpenAI**: ~$0.001 per commit (GPT-4o-mini)
- **Anthropic**: ~$0.003 per commit (Claude 3.5 Sonnet)
- **Gemini**: ~$0.0005 per commit (Gemini 1.5 Flash)
- **Fallback**: Free (pattern-based)

## 🔧 Troubleshooting

### AI Not Working

1. Check API key in `.env` file
2. Verify API key is valid and has credits
3. Check network connection
4. Try fallback: `yarn commit:smart`
5. Consider switching between OpenAI, Anthropic, or Gemini

### Poor Quality Messages

1. Stage fewer files at once
2. Make more focused changes
3. Adjust temperature in config (lower = more consistent)
4. Customize the prompt template

### Slow Performance

1. Reduce `maxFiles` in config
2. Lower `maxDiffSize` in config
3. Use OpenAI instead of Anthropic (faster)
4. Use pattern-based fallback

## 📊 Comparison

| Feature           | AI-Powered | Pattern-Based  | Interactive |
| ----------------- | ---------- | -------------- | ----------- |
| **Intelligence**  | 🤖 High    | 📊 Medium      | 👤 Manual   |
| **Speed**         | ⚡ Fast    | ⚡⚡ Very Fast | 🐌 Slow     |
| **Cost**          | 💰 Low     | 🆓 Free        | 🆓 Free     |
| **Accuracy**      | 🎯 High    | 🎯 Medium      | 🎯 High     |
| **Customization** | 🔧 High    | 🔧 Medium      | 🔧 Full     |

## 🎉 Benefits

✅ **Intelligent**: Understands code context and purpose
✅ **Consistent**: Follows conventional commit standards
✅ **Time-saving**: No more thinking about commit messages
✅ **Educational**: Learn from AI-generated messages
✅ **Flexible**: Easy to edit or override
✅ **Reliable**: Fallback options ensure it always works

Your commit messages will now be generated by actual AI/LLMs that understand your code and can create meaningful, context-aware commit messages! 🚀
