import type { FastifyInstance } from 'fastify';

import ScalarApiReference from '@scalar/fastify-api-reference';

import { apiRoutes } from '@/presentation/routes';

export const setupRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', async (req, reply) => {
    if (req.url.startsWith('/docs')) {
      reply.header(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
      );
    }
  });

  await app.register(ScalarApiReference, {
    routePrefix: '/docs',
  });

  app.register(apiRoutes, { prefix: '/api' });
};
