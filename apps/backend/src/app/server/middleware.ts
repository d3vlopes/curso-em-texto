import type { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

export const setupMiddleware = (app: FastifyInstance) => {
  app.register(cors);
  app.register(helmet);
};
