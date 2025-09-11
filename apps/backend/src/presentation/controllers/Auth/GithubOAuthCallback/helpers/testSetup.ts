/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseCaseStub } from '@/__tests__/stubs/UseCaseStub';
import type {
  OAuthLoginInput,
  OAuthLoginResponse,
} from '@/services/useCases/auth/OAuthLogin/login/OAuthLoginUseCase';
import type { OAuth } from '@/services/contracts/OAuth';

import {
  type GithubAuthResponse,
  type GithubEmailsResponse,
  GithubOAuthCallbackController,
} from '../GithubOAuthCallbackController';

vitest.mock('@/app/env', () => ({
  env: {
    FRONTEND_URL: 'http://frontend.test',
  },
}));

export const userDataMock: GithubAuthResponse = {
  id: 146567,
  email: 'john@example.com',
  name: 'John Doe',
  avatar_url: 'http://avatar.test/john.png',
  login: 'johndev',
};

export const emailsMock: GithubEmailsResponse[] = [
  {
    email: 'primary@example.com',
    primary: true,
    verified: true,
    visibility: 'public',
  },
  {
    email: 'secondary@example.com',
    primary: false,
    verified: true,
    visibility: 'public',
  },
];

export function mockSuccessFetchAPI() {
  (globalThis as any).fetch = vitest
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      json: async () => userDataMock,
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => emailsMock,
    });
}

class OAuthStub implements OAuth {
  getAccessToken(_: unknown): Promise<string | null> {
    return Promise.resolve('access_mock_token');
  }
}

export const makeSut = () => {
  const loginUseCaseStub = new UseCaseStub<
    OAuthLoginInput,
    OAuthLoginResponse
  >();

  const oauthStub = new OAuthStub();

  const sut = new GithubOAuthCallbackController(loginUseCaseStub, oauthStub);

  return {
    sut,
    loginUseCaseStub,
    oauthStub,
  };
};
