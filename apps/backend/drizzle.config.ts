import { defineConfig } from 'drizzle-kit';

import { env } from './src/app/env';

export default defineConfig({
  schema: './src/data/schema',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
