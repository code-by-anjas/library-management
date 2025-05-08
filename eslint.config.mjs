import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:tailwindcss/recommended",
    "prettier"
  ),

  ...compat.config({
    ignorePatterns: [
      "node_modules/",
      ".next/",
      "out/",
      "public/static/",
      ".vercel/",
      "*.log",
      "logs/",
      "*.log*",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      ".vscode/",
      ".idea/",
      "*.suo",
      "*.ntvs*",
      "*.njsproj",
      "*.sln",
      "README.md",
      "create-module.ts",
      "globals.css",
      ".env",
      ".env.local",
      ".env.development.local",
      ".env.test.local",
      ".env.production.local",
    ],
  }),
];

export default eslintConfig;
