#!/bin/bash

echo "🔧 Setting up Git aliases for commit tools..."

# Get the absolute path to the project root
PROJECT_ROOT=$(git rev-parse --show-toplevel)

# Set up Git aliases
git config alias.ac "!$PROJECT_ROOT/scripts/smart-commit.js"
git config alias.auto-commit "!$PROJECT_ROOT/scripts/smart-commit.js"
git config alias.ai-commit "!$PROJECT_ROOT/scripts/ai-commit-generator.js"
git config alias.cz "!yarn commit"

echo "✅ Git aliases configured!"
echo ""
echo "📝 Available commit commands:"
echo "  git ac          - Smart auto-commit with pattern-based message"
echo "  git auto-commit - Same as git ac"
echo "  git ai-commit   - AI-powered commit with LLM-generated message"
echo "  git cz          - Interactive commitizen"
echo "  yarn commit     - Interactive commitizen"
echo "  yarn commit:smart - Smart auto-commit (pattern-based)"
echo "  yarn commit:ai    - AI-powered commit (LLM-based)"
echo "  yarn commit:auto  - Generate commit message only"
echo ""
echo "💡 Usage examples:"
echo "  git add . && git ac"
echo "  git add . && git ai-commit"
echo "  git add . && yarn commit:ai"
echo "  git add . && yarn commit:smart"
echo "  git add . && yarn commit"
