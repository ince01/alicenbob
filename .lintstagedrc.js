export default {
  // JavaScript, TypeScript, and React files
  "*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}": ["eslint --fix", "prettier --write"],

  // JSON files
  "*.{json,jsonc,json5}": ["eslint --fix", "prettier --write"],

  // Markdown files
  "*.md": ["eslint --fix", "prettier --write"],

  // YAML files
  "*.{yml,yaml}": ["prettier --write"],

  // Package.json files
  "package.json": ["prettier --write"],
};
