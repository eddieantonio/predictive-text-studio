module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  rules: {
    // Project-speific rules

    // Always prefer T[] instead of Array<T>
    "@typescript-eslint/array-type": ["error", { default: "array" }],
  },
};
