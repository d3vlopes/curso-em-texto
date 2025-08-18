/* eslint-disable no-console */
import Fastify from 'fastify';

import { env } from '../env';

import { setupMiddleware } from './middleware';
import { setupRoutes } from './routes';

export const app = Fastify();

export async function bootstrap() {
  try {
    const PORT = env.PORT || 8000;

    setupMiddleware(app);
    setupRoutes(app);

    app.listen({ port: PORT, host: '0.0.0.0' }, () =>
      console.log(`Server is running in http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
}
