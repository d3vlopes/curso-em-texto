import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from '../../vitest.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      coverage: {
        include: ['src/components/**', 'src/hooks/**', 'src/templates/**/*'],
        exclude: [
          'src/components/components/**/.stories.tsx',
          'src/components/components/**/*.mock.ts',
        ],
      },
    },
  })
);
