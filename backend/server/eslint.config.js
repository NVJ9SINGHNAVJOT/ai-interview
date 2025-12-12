// eslint.config.js
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import ts from "@typescript-eslint/eslint-plugin";
import drizzle from "eslint-plugin-drizzle";

export default [
  {
    ignores: ["dist/**", "build/**"],
  },

  js.configs.recommended,

  {
    files: ["src/**/*.ts"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        console: "readonly",
        module: "readonly",
        require: "readonly",
        process: "readonly",

        // Express global type (to suppress "Express is not defined")
        Express: "readonly",
      },
    },

    plugins: {
      "@typescript-eslint": ts,
      drizzle,
    },

    rules: {
      semi: "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",

      "drizzle/enforce-delete-with-where": "error",
      "drizzle/enforce-update-with-where": "error",
    },
  },
];
