import type { OAuth2Namespace } from '@fastify/oauth2';
import type { FastifyRequest } from 'fastify';

import type { OAuth } from '@/services/contracts/OAuth';

export class OAuthAdapter implements OAuth {
  constructor(private readonly oauthClient: OAuth2Namespace) {}

  async getAccessToken(req: FastifyRequest): Promise<string> {
    const { token } =
      await this.oauthClient.getAccessTokenFromAuthorizationCodeFlow(req);

    return token.access_token;
  }
}
