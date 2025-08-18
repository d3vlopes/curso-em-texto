import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    ignores: ['node_modules', 'dist', '.next'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': ts,
      prettier,
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules,
      'no-var': 'error',
      curly: ['error', 'multi-line'],
      'no-multi-spaces': 'error',
      'space-in-parens': 'error',
      'no-multiple-empty-lines': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'prettier/prettier': ['error'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-array-index-key': 'warn',
      'react/jsx-key': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // 'react-refresh/only-export-components': [
      //   'warn',
      //   { allowConstantExport: true },
      // ],
    },
  },
];
