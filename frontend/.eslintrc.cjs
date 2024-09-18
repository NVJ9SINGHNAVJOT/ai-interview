module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", "build", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    semi: "warn",
    "no-console": "warn",
    "no-unused-vars": "warn",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
};
