
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  {
    ignores: ['node_modules', 'dist'],
    rules: {
      "@typescript-eslint/no-require-imports": "error",
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      'no-console': 'warn',
      'no-undef':'error',
    },
  },
  {
    ignores: [".node_modules/*"]
},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];