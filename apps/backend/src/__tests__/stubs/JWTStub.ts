import type { JWT, JWTPayload } from '@/services/contracts/JWT';

export const GENERATE_MOCK_TOKEN = 'token-mock';

export class JWTStub implements JWT {
  generateToken(_: JWTPayload): string {
    return GENERATE_MOCK_TOKEN;
  }

  verifyToken(_: string): JWTPayload | null {
    return {
      userId: '1',
    };
  }
}
