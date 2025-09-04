import type { Controller } from '@/presentation/contracts/Controller';
import type { HttpResponse } from '@/presentation/contracts/HttpResponse';

import type { UseCase } from '@/services/contracts/UseCase';
import type {
  OAuthLoginInput,
  OAuthLoginResponse,
} from '@/services/useCases/auth/OAuthLogin/login/OAuthLoginUseCase';

type ProviderType = 'google' | 'github';

const validProviders: ProviderType[] = ['google', 'github'];

export interface OAuthLoginRequest {
  provider: 'google' | 'github';
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
}

export class OAuthLoginController implements Controller {
  constructor(
    private readonly oauthLoginUseCase: UseCase<
      OAuthLoginInput,
      OAuthLoginResponse
    >
  ) {}

  async handle(input: unknown): Promise<HttpResponse> {
    try {
      const { provider, user } = input as OAuthLoginRequest;

      if (!provider || !user) {
        return {
          statusCode: 400,
          body: new Error('Missing OAuth data'),
        };
      }

      if (!this.validateProvider(provider)) {
        return {
          statusCode: 400,
          body: new Error('Invalid OAuth provider'),
        };
      }

      const { error, data } = await this.oauthLoginUseCase.execute({
        provider,
        oauthData: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
        },
      });

      if (error) {
        return {
          statusCode: 400,
          body: new Error(error),
        };
      }

      return {
        statusCode: 200,
        body: data,
      };
    } catch {
      return {
        statusCode: 500,
        body: new Error('Internal server error'),
      };
    }
  }

  private validateProvider(provider: ProviderType) {
    for (const validProvider of validProviders) {
      if (provider === validProvider) {
        return true;
      }
    }

    return false;
  }
}
