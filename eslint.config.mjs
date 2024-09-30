import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    languageOptions: {
      globals: { ...globals.node }, // Add Node.js globals (including 'process')
    },
  },
  pluginJs.configs.recommended,

  // Prettier plugin and configuration
  {
    plugins: { prettier },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },
];
