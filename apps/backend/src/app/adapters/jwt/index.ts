import jwt from 'jsonwebtoken';

import type { JWT, JWTPayload } from '@/services/contracts/JWT';

import { env } from '@/app/env';

export class JWTAdapter implements JWT {
  generateToken(payload: JWTPayload): string {
    const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });

    return token;
  }

  verifyToken(token: string): JWTPayload | null {
    try {
      const payload = jwt.verify(token, env.JWT_SECRET);

      if (typeof payload === 'object' && payload && 'userId' in payload) {
        return payload as JWTPayload;
      }

      return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
