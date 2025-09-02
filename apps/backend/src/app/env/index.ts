/* eslint-disable no-console */
import 'dotenv/config';

import { z } from 'zod';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const postgreSQLSchema = z.object({
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
});

const schema = z
  .object({
    PORT: z.coerce.number().default(8000),
    DATABASE_URL: z.url(),
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    JWT_SECRET: z.string().min(1),
  })
  .extend(
    IS_PRODUCTION ? postgreSQLSchema.partial().shape : postgreSQLSchema.shape
  );

const _env = schema.safeParse(process.env);

const isInvalidFormat = _env.success === false;

if (isInvalidFormat) {
  console.error('Invalid environment variables', _env.error.format());

  throw new Error('Invalid environment variables');
}

export const env = _env.data;
