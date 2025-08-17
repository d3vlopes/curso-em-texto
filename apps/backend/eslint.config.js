import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  {
    ignore: ['drizzle.config.ts'],
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
