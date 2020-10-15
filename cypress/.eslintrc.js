module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: ["../.eslintrc.js"],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
  },
};
