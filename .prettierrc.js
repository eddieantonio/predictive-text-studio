/**
 * A summary of the code style:
 *
 *  - lines SHOULD be at most 80 characters long; some exceptions are welcome.
 *  - 2 space indent, which makes the line length requirement more doable.
 *  - semicolons are REQUIRED after every line.
 *  - always use a comma at the end of multi-line literals:
 *
 *      {
 *        "hello": "world", // ← comma!
 *      }
 *
 *    (makes for smaller git diffs!)
 *  - Use double-quotes for string literals UNLESS you're using double quotes
 *    within the strings.
 */
module.exports = {
  semi: true,
  trailingComma: "es5",
  printWidth: 80,
  tabWidth: 2,
  svelteSortOrder: "scripts-styles-markup",
  svelteIndentScriptAndStyle: true,
};
