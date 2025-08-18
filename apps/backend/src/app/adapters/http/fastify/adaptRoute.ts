import type { FastifyRequest, FastifyReply } from 'fastify';

import type { Controller } from '@/presentation/contracts/Controller';

export const adaptRoute = (controller: Controller) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const request = {
      ...(req.body || {}),
      params: { ...(req.params || {}) },
    };

    const httpResponse = await controller.handle(request);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).send(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).send({
        error: httpResponse.body?.message,
      });
    }
  };
};
