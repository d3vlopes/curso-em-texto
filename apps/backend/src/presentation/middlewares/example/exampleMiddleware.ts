import type { FastifyReply, FastifyRequest } from 'fastify';

export const exampleMiddleware = (req: FastifyRequest, res: FastifyReply) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).send({ error: 'Token não fornecido' });
    return;
  }

  const payload = 'example-payload';

  req.example = payload;
};

declare module 'fastify' {
  interface FastifyRequest {
    example?: string;
  }
}
