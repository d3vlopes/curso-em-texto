import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  {
    ignores: ['*.config.{js,ts}', 'drizzle/*'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
];
