# Commit Hooks

This monorepo uses Husky and lint-staged to enforce code quality standards before commits and pushes.

## Setup

The commit hooks are automatically installed when you run `yarn install` due to the `prepare` script in `package.json`.

## Auto-Generated Commit Messages 🚀

This project includes **automatic commit message generation** to save you time and ensure consistent commit messages.

### Quick Start

```bash
# Stage your changes
git add .

# Use smart auto-commit (recommended)
yarn commit:smart

# Or use Git alias
git ac

# Or use interactive commitizen
yarn commit
```

### Available Commit Tools

#### 1. Smart Auto-Commit (`yarn commit:smart` or `git ac`)

- 🤖 **AI-powered**: Analyzes your staged files and generates appropriate commit messages
- 🎯 **Smart detection**: Automatically detects commit type (feat, fix, docs, etc.) and scope
- ✅ **Interactive**: Asks for confirmation before committing
- 🔧 **Flexible**: Option to edit the generated message

#### 2. Interactive Commitizen (`yarn commit` or `git cz`)

- 📝 **Step-by-step**: Guided interactive process
- 🎨 **Customizable**: Full control over commit type, scope, and message
- 📋 **Template-based**: Uses conventional commit templates

#### 3. Message Generator Only (`yarn commit:auto`)

- 💡 **Preview only**: Generates commit message without committing
- 🔍 **Analysis**: Shows what the AI detected in your changes

### Setup Git Aliases (Optional)

Run this once to set up convenient Git aliases:

```bash
./scripts/setup-git-aliases.sh
```

This will add:

- `git ac` - Smart auto-commit
- `git auto-commit` - Same as git ac
- `git cz` - Interactive commitizen

## Hooks Overview

### Pre-commit Hook (`.husky/pre-commit`)

- Runs `lint-staged` to automatically fix and format staged files
- Ensures all committed code follows the project's linting and formatting rules
- Only processes files that are actually staged for commit (efficient)

### Commit Message Hook (`.husky/commit-msg`)

- Validates commit message format using conventional commits
- Ensures consistent commit message structure across the project
- Required format: `type(scope): description`

**Valid commit types:**

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks
- `revert`: Reverting previous commits

**Examples:**

```bash
git commit -m "feat: add user authentication"
git commit -m "fix(server): resolve database connection issue"
git commit -m "docs: update API documentation"
git commit -m "style: format code with prettier"
```

### Pre-push Hook (`.husky/pre-push`)

- Runs full linting check on the entire codebase
- Runs tests (if available)
- Ensures code quality before pushing to remote repository

## Lint-staged Configuration

The `.lintstagedrc.js` file configures what happens to staged files:

- **JavaScript/TypeScript/React files**: ESLint fixes + Prettier formatting
- **JSON files**: ESLint fixes + Prettier formatting
- **Markdown files**: ESLint fixes + Prettier formatting
- **YAML files**: Prettier formatting only
- **Package.json**: Prettier formatting only

## Available Scripts

```bash
# Auto-commit tools
yarn commit:smart    # Smart auto-commit with AI-generated message
yarn commit:auto     # Generate commit message only
yarn commit          # Interactive commitizen

# Git aliases (after running setup script)
git ac               # Smart auto-commit
git auto-commit      # Same as git ac
git cz               # Interactive commitizen

# Manual tools
yarn lint            # Run linting on all files
yarn lint:fix        # Run linting and auto-fix issues
yarn lint:check      # Check linting without auto-fixing
yarn format          # Format all files with Prettier
yarn format:check    # Check formatting without making changes
yarn test            # Run tests across all workspaces
```

## Workflow Examples

### Daily Development Workflow

```bash
# 1. Make your changes
# 2. Stage files
git add .

# 3. Use smart auto-commit (recommended)
yarn commit:smart

# 4. Push when ready
git push
```

### Interactive Workflow

```bash
# 1. Stage files
git add .

# 2. Use interactive commitizen for full control
yarn commit

# 3. Follow the prompts
```

### Quick Fix Workflow

```bash
# 1. Stage files
git add .

# 2. Use Git alias for speed
git ac

# 3. Confirm the generated message
```

## Bypassing Hooks (Emergency Only)

If you need to bypass the hooks in an emergency:

```bash
# Skip pre-commit hook
git commit --no-verify -m "emergency fix"

# Skip pre-push hook
git push --no-verify
```

⚠️ **Warning**: Only use these flags in true emergencies. The hooks are there to maintain code quality.

## Troubleshooting

### Hook not running

1. Ensure you ran `yarn install` after the hooks were added
2. Check that the hook files are executable: `ls -la .husky/`
3. Verify Git hooks are enabled: `git config core.hooksPath`

### Linting errors

1. Run `yarn lint:fix` to auto-fix most issues
2. Run `yarn format` to format code with Prettier
3. Check the ESLint configuration in `eslint.config.js`

### Commit message rejected

- Follow the conventional commit format
- Keep the description under 50 characters
- Use one of the valid commit types listed above

### Auto-commit not working

1. Make sure you have staged files: `git status`
2. Check that the script is executable: `ls -la scripts/smart-commit.js`
3. Try running manually: `node scripts/smart-commit.js`

## Configuration Files

- `.husky/`: Git hooks directory
- `.lintstagedrc.js`: Lint-staged configuration
- `.czrc`: Commitizen configuration
- `scripts/smart-commit.js`: Smart auto-commit script
- `scripts/generate-commit-msg.js`: Commit message generator
- `eslint.config.js`: ESLint configuration
- `.prettierrc`: Prettier configuration
- `package.json`: Scripts and dependencies
