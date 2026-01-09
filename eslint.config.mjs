// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/indent': 'off',
      'indent': 'off',
      '@typescript-eslint/space-before-blocks': 'off',
      'space-before-blocks': 'off',
      '@typescript-eslint/space-before-function-paren': 'off',
      'space-before-function-paren': 'off',
      '@typescript-eslint/space-infix-ops': 'off',
      'space-infix-ops': 'off',
      'prettier/prettier': 'off'
    },
  },
);