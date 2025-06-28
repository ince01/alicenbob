import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/coverage/**",
      "**/.yarn/**",
      "**/yarn.lock",
      "**/package-lock.json",
      "**/pnpm-lock.yaml",
      "**/tempo-data/**",
      "**/*.config.js",
      "**/*.config.mjs",
      "**/*.config.ts",
      "**/tsconfig*.json",
      "**/vite.config.ts",
      "**/nodemon.json",
      "**/Dockerfile",
      "**/docker-compose.yaml",
      "**/*.yaml",
      "**/*.yml",
      "**/.DS_Store",
      "**/.git/**",
      "**/.vscode/**",
      "**/.idea/**",
      "**/eslint.config.js",
    ],
  },

  // Base ESLint recommended config
  eslint.configs.recommended,

  // TypeScript ESLint recommended config
  tseslint.configs.recommended,

  // Prettier integration
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,

  // Node.js/Express specific configuration (for server app)
  {
    files: ["apps/server/**/*.{js,ts}", "scripts/**/*.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.es2022,
      },
      ecmaVersion: 2022,
      sourceType: "module",
    },
  },

  // React/Web app specific configuration
  {
    files: ["apps/web/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },


  // React Hooks
  reactHooks.configs['recommended-latest'],

  // Disable problematic rules
  {
    rules: {
      "no-irregular-whitespace": "off",
    },
  },
);

