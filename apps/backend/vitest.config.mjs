import { defineConfig, mergeConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

import baseConfig from '@curso-em-texto/vitest-config';

export default mergeConfig(
  defineConfig({
    ...baseConfig,
    plugins: [tsconfigPaths()],
    test: {
      ...baseConfig.test,
      environment: 'node',
      exclude: ['./src/__tests__/**'],
      coverage: {
        ...baseConfig.test.coverage,
        include: [
          'src/presentation/controllers/**',
          'src/services/useCases/**',
        ],
      },
    },
  })
);
