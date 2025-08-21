import baseConfig from '@curso-em-texto/eslint-config';

export default [
  ...baseConfig,
  {
    ignores: ['*.config.{js,ts}'],
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
