import type { Preview } from '@storybook/nextjs-vite';

import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        500: { name: 'background-500', value: 'var(--color-background-500)' },
        400: { name: 'background-400', value: 'var(--color-background-400)' },
        300: { name: 'background-300', value: 'var(--color-background-300)' },
        200: { name: 'background-200', value: 'var(--color-background-200)' },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
  initialGlobals: {
    backgrounds: { value: 500 },
  },
};

export default preview;
