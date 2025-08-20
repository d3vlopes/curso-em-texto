import type { FastifyInstance } from 'fastify';
import FastifySwagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';

export type FastifyOpenapiOptionsType = Pick<
  FastifyDynamicSwaggerOptions,
  'openapi'
>['openapi'];

export const setupSwagger = async (
  app: FastifyInstance,
  openapiOptions: FastifyOpenapiOptionsType
) => {
  await app.register(FastifySwagger, {
    openapi: openapiOptions,
  });
};
