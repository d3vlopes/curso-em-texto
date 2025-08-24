import { defineConfig, mergeConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import baseConfig from '@curso-em-texto/vitest-config';

export default mergeConfig(
  defineConfig({
    ...baseConfig,
    plugins: [tsconfigPaths(), react()],
    test: {
      ...baseConfig.test,
      exclude: ['__tests__/mocks/*'],
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
      coverage: {
        ...baseConfig.test.coverage,
        include: ['src/components/**', 'src/hooks/*', 'src/templates/**'],
        exclude: [
          'src/components/**/*.stories.tsx',
          'src/components/**/*.mock.ts',
        ],
      },
    },
  })
);
