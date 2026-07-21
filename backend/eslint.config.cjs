const pluginJs = require('@eslint/js');
const globals = require('globals');
const stylistic = require('@stylistic/eslint-plugin');

module.exports = [
  pluginJs.configs.recommended,
  // Add the formatting rules
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: false, // Set to true if you ever use React components here
  }),
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },
];
