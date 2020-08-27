module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // Project-speific rules
    //
    // For now, there are none!
  }
};
