import type { FastifyPluginAsync } from 'fastify';

import { adaptRoute } from '@/app/adapters/http/fastify/adaptRoute';
import { makeCreateExampleController } from '@/factories/controllers/Example/CreateExampleControllerFactory';
import { exampleMiddleware } from '@/presentation/middlewares/example/exampleMiddleware';

export const exampleRoutes: FastifyPluginAsync = async (app) => {
  app.post(
    '/example/create',
    {
      preHandler: [exampleMiddleware],
      schema: {
        description: 'Endpoint for create a new example',
        tags: ['Example'],
        summary: 'Create a new example',
        body: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
          },
        },
        response: {
          201: {
            description: 'Successful response',
            type: 'object',
            properties: {
              id: { type: 'number' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              email: { type: 'string' },
              username: { type: 'string' },
              createdAt: { type: 'string' },
            },
          },
          400: {
            description: 'Bad request',
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
          500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    adaptRoute(makeCreateExampleController())
  );
};
