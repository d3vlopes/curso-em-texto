import type { FastifyReply, FastifyRequest } from 'fastify';
import { JWTAdapter } from '@/app/adapters/jwt';

export const authMiddleware = (
  req: FastifyRequest,
  res: FastifyReply,
  next: () => void
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({ error: 'Token não fornecido' });
  }

  if (!authorization.startsWith('Bearer ')) {
    return res.status(401).send({ error: 'Token inválido' });
  }

  const token = authorization.split(' ')[1];
  try {
    const decoded = new JWTAdapter().verifyToken(token);

    req.user = decoded?.userId;

    next();

    return res.status(200).send({ payload: decoded });
  } catch (error) {
    return res.status(401).send({ error });
  }
};

declare module 'fastify' {
  interface FastifyRequest {
    user?: string;
  }
}
