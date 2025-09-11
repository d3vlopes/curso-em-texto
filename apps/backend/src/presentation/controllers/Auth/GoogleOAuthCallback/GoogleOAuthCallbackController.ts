import { env } from '@/app/env';
import type { Controller } from '@/presentation/contracts/Controller';
import type { HttpResponse } from '@/presentation/contracts/HttpResponse';
import { OAuth } from '@/services/contracts/OAuth';

import type { UseCase } from '@/services/contracts/UseCase';
import type {
  OAuthLoginInput,
  OAuthLoginResponse,
} from '@/services/useCases/auth/OAuthLogin/login/OAuthLoginUseCase';

export interface GoogleAuthResponse {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export class GoogleOAuthCallbackController implements Controller {
  constructor(
    private readonly oauthLoginUseCase: UseCase<
      OAuthLoginInput,
      OAuthLoginResponse
    >,
    private readonly oauth: OAuth
  ) {}

  async handle(request: unknown): Promise<HttpResponse> {
    try {
      const accessToken = await this.oauth.getAccessToken(request);

      if (!accessToken) {
        return {
          statusCode: 400,
          body: new Error('Failed to get access token'),
        };
      }

      const userResponse = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!userResponse.ok) {
        return {
          statusCode: 400,
          body: new Error('Failed to fetch user data'),
        };
      }

      const userData = (await userResponse.json()) as GoogleAuthResponse;

      const { error, data } = await this.oauthLoginUseCase.execute({
        provider: 'google',
        oauthData: {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          avatar: userData.picture,
        },
      });

      if (error || !data) {
        return {
          statusCode: 400,
          body: new Error(error || 'Unexpected error'),
        };
      }

      const redirectUrl = new URL(`${env.FRONTEND_URL}/auth/callback`);

      redirectUrl.searchParams.set('token', data.token);

      return {
        statusCode: 302,
        body: null,
        redirect: {
          url: redirectUrl.toString(),
        },
      };
    } catch {
      return {
        statusCode: 500,
        body: new Error('Internal server error'),
      };
    }
  }
}
