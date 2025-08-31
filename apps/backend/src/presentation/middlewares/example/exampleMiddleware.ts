import type { FastifyReply, FastifyRequest } from 'fastify';

export const exampleMiddleware = (
  req: FastifyRequest,
  res: FastifyReply,
  next: () => void
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({ error: 'Token não fornecido' });
  }

  const payload = 'example-payload';

  req.example = payload;

  next();

  return res.status(200);
};

declare module 'fastify' {
  interface FastifyRequest {
    example?: string;
  }
}
