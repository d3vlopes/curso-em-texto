import type { FastifyReply, FastifyRequest } from 'fastify';
import { JWTAdapter } from '@/app/adapters/jwt';

export const authMiddleware = (req: FastifyRequest, res: FastifyReply) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).send({ error: 'Token not provided' });
    return;
  }

  const tokenParts = authorization.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    res.status(401).send({ error: 'Invalid token format' });
    return;
  }

  const token = tokenParts[1];

  try {
    const decoded = new JWTAdapter().verifyToken(token);

    if (!decoded) {
      res.status(401).send({ error: 'Invalid token' });
      return;
    }

    req.userId = decoded.userId;
  } catch {
    res.status(401).send({ error: 'Unauthorized' });
  }
};
