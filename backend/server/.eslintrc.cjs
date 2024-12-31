module.exports = {
  root: true,
  env: { es2022: true, node: true, commonjs: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:drizzle/recommended"],
  ignorePatterns: ["dist", "build", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "drizzle"],
  rules: {
    semi: "warn",
    "no-unused-vars": "warn",
    "no-console": "warn",
    "drizzle/enforce-delete-with-where": "error",
    "drizzle/enforce-update-with-where": "error",
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
};
