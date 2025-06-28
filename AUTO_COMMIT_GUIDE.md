# Auto-Commit Guide 🚀

Quick reference for automatic commit message generation in this monorepo.

## Quick Commands

```bash
# Smart auto-commit (recommended)
yarn commit:smart

# Git alias (after setup)
git ac

# Interactive commitizen
yarn commit

# Generate message only (preview)
yarn commit:auto
```

## Setup (One-time)

```bash
# Install dependencies
yarn install

# Set up Git aliases
./scripts/setup-git-aliases.sh
```

## How It Works

### Smart Auto-Commit (`yarn commit:smart`)

1. Analyzes your staged files
2. Detects commit type (feat, fix, docs, etc.)
3. Determines scope (server, web, shared, etc.)
4. Generates descriptive message
5. Asks for confirmation
6. Commits with hooks

### What It Detects

**Commit Types:**

- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation
- `style` - Code formatting
- `refactor` - Code improvements
- `test` - Test files
- `build` - Dependencies/config
- `chore` - Maintenance

**Scopes:**

- `server` - Server app changes
- `web` - Web app changes
- `shared` - Shared packages
- `deps` - Dependencies
- `docs` - Documentation
- `config` - Configuration

## Examples

```bash
# Adding new feature
git add apps/server/src/features/auth.ts
yarn commit:smart
# → feat(server): add authentication feature

# Fixing bug
git add apps/web/src/components/Button.tsx
yarn commit:smart
# → fix(web): resolve button click handler issue

# Updating docs
git add README.md COMMIT_HOOKS.md
yarn commit:smart
# → docs: update project documentation

# Adding dependencies
git add package.json yarn.lock
yarn commit:smart
# → build(deps): add new dependencies
```

## Workflow

```bash
# 1. Make changes
# 2. Stage files
git add .

# 3. Auto-commit
yarn commit:smart

# 4. Confirm message (y/n/e for edit)
# 5. Push when ready
git push
```

## Troubleshooting

**No staged files:**

```bash
git add .
```

**Script not executable:**

```bash
chmod +x scripts/smart-commit.js
```

**Git alias not working:**

```bash
./scripts/setup-git-aliases.sh
```

## Configuration Files

- `.czrc` - Commitizen configuration
- `scripts/smart-commit.js` - Smart commit script
- `scripts/generate-commit-msg.js` - Message generator
- `package.json` - Scripts and dependencies

## Tips

- Use `yarn commit:smart` for most commits
- Use `yarn commit` when you need full control
- Use `yarn commit:auto` to preview the message
- The system respects your existing commit hooks
- All generated messages follow conventional commits
