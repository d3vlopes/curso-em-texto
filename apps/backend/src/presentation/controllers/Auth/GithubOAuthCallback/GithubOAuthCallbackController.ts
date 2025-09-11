import { env } from '@/app/env';
import type { Controller } from '@/presentation/contracts/Controller';
import type { HttpResponse } from '@/presentation/contracts/HttpResponse';
import { OAuth } from '@/services/contracts/OAuth';

import type { UseCase } from '@/services/contracts/UseCase';
import type {
  OAuthLoginInput,
  OAuthLoginResponse,
} from '@/services/useCases/auth/OAuthLogin/login/OAuthLoginUseCase';

export interface GithubAuthResponse {
  id: number;
  email: string | null;
  name: string | null;
  login: string;
  avatar_url: string;
}

export interface GithubEmailsResponse {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}

export class GithubOAuthCallbackController implements Controller {
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

      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'curso-em-texto',
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!userResponse.ok) {
        return {
          statusCode: 400,
          body: new Error('Failed to fetch user data'),
        };
      }

      const userData = (await userResponse.json()) as GithubAuthResponse;

      const emailResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'curso-em-texto',
          Accept: 'application/vnd.github.v3+json',
        },
      });

      let primaryEmail = userData.email;

      if (emailResponse.ok) {
        const emails = (await emailResponse.json()) as GithubEmailsResponse[];

        const primaryEmailObj = emails.find(
          (email) => email.primary && email.verified
        );

        if (primaryEmailObj) {
          primaryEmail = primaryEmailObj.email;
        }
      }

      if (!primaryEmail) {
        return {
          statusCode: 400,
          body: new Error('Unable to get email from GitHub.'),
        };
      }

      const { error, data } = await this.oauthLoginUseCase.execute({
        provider: 'github',
        oauthData: {
          id: userData.id.toString(),
          email: primaryEmail,
          name: userData.name || userData.login,
          avatar: userData.avatar_url,
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
