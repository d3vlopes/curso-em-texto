import type { FastifyInstance } from 'fastify';

import { apiRoutes } from '@/presentation/routes';

export const setupRoutes = (app: FastifyInstance) => {
  app.register(apiRoutes, { prefix: '/api' });
};
