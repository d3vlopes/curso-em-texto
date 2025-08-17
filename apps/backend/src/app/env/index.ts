/* eslint-disable no-console */
import 'dotenv/config';

import { z } from 'zod';

const schema = z.object({
  PORT: z.coerce.number().default(8000),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DATABASE_URL: z.url(),
});

const _env = schema.safeParse(process.env);

const isInvalidFormat = _env.success === false;

if (isInvalidFormat) {
  console.error('Invalid environment variables', _env.error.format());

  throw new Error('Invalid environment variables');
}

export const env = _env.data;
