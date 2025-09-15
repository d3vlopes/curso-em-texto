import type { FastifyReply, FastifyRequest } from 'fastify';
import { JWTAdapter } from '@/app/adapters/jwt';

export const authMiddleware = (
  req: FastifyRequest,
  res: FastifyReply,
  next: () => void
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({ error: 'Token not provided' });
  }

  const tokenParts = authorization.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).send({ error: 'Invalid token format' });
  }

  const token = tokenParts[1];

  try {
    const decoded = new JWTAdapter().verifyToken(token);

    if (!decoded) {
      return res.status(401).send({ error: 'Invalid token' });
    }

    req.userId = decoded.userId;

    next();
  } catch {
    return res.status(401).send({ error: 'Unauthorized' });
  }
};
