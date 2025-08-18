import type { FastifyPluginAsync } from 'fastify';

import { adaptRoute } from '@/app/adapters/http/fastify/adaptRoute';
import { makeCreateExampleController } from '@/factories/controllers/Example/CreateExampleControllerFactory';

export const exampleRoutes: FastifyPluginAsync = async (app) => {
  app.post('/example/create', adaptRoute(makeCreateExampleController()));
};
