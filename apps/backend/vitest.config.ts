import { defineConfig, mergeConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

import baseConfig from '../../vitest.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      environment: 'node',
      exclude: ['./src/__tests__/**'],
      coverage: {
        include: [
          'src/presentation/controllers/**',
          'src/services/useCases/**',
        ],
      },
    },
  })
);
