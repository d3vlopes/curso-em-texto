/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseCaseStub } from '@/__tests__/stubs/UseCaseStub';
import type { OAuth } from '@/services/contracts/OAuth';
import type {
  OAuthLoginInput,
  OAuthLoginResponse,
} from '@/services/useCases/auth/OAuthLogin/login/OAuthLoginUseCase';

import { GoogleOAuthCallbackController } from './GoogleOAuthCallbackController';

vitest.mock('@/app/env', () => ({
  env: {
    FRONTEND_URL: 'http://frontend.test',
  },
}));

const userDataMock = {
  id: 'google-id',
  email: 'john@example.com',
  name: 'John Doe',
  picture: 'http://avatar.test/john.png',
};

class OAuthStub implements OAuth {
  getAccessToken(_: unknown): Promise<string | null> {
    return Promise.resolve('access_mock_token');
  }
}

const makeSut = () => {
  const loginUseCaseStub = new UseCaseStub<
    OAuthLoginInput,
    OAuthLoginResponse
  >();

  const oauthStub = new OAuthStub();

  const sut = new GoogleOAuthCallbackController(loginUseCaseStub, oauthStub);

  return {
    sut,
    loginUseCaseStub,
    oauthStub,
  };
};

describe('GoogleOAuthCallbackController', () => {
  it('should return status code 400 if access token missing', async () => {
    const { sut, oauthStub } = makeSut();

    vitest
      .spyOn(oauthStub, 'getAccessToken')
      .mockImplementation(() => Promise.resolve(null));

    const response = await sut.handle({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(
      new Error('Failed to get access token')
    );
  });

  it('should return status code 400 if failed to fetch user data', async () => {
    const { sut } = makeSut();

    (globalThis as any).fetch = vitest.fn().mockResolvedValueOnce({
      ok: false,
    });

    const response = await sut.handle({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(new Error('Failed to fetch user data'));
  });

  it('should return status 400 if use case returns error', async () => {
    const { sut, loginUseCaseStub } = makeSut();

    (globalThis as any).fetch = vitest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => userDataMock,
    });

    vitest.spyOn(loginUseCaseStub, 'execute').mockResolvedValueOnce({
      data: null,
      error: 'UseCase error',
    });

    const response = await sut.handle({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(new Error('UseCase error'));
  });

  it('should return status code 302 if use case success', async () => {
    const { sut, loginUseCaseStub } = makeSut();

    (globalThis as any).fetch = vitest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => userDataMock,
    });

    vitest.spyOn(loginUseCaseStub, 'execute').mockResolvedValueOnce({
      data: { token: 'access-token' },
      error: null,
    });

    const response = await sut.handle({});

    expect(response.statusCode).toBe(302);
    expect(response.redirect?.url).toBe(
      'http://frontend.test/auth/callback?token=access-token'
    );

    expect((globalThis as any).fetch).toHaveBeenCalledWith(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: 'Bearer access_mock_token',
        },
      }
    );

    expect(loginUseCaseStub.execute).toHaveBeenCalledWith({
      provider: 'google',
      oauthData: {
        id: userDataMock.id,
        email: userDataMock.email,
        name: userDataMock.name,
        avatar: userDataMock.picture,
      },
    });
  });

  it('should return status 500 if an unexpected error occurs', async () => {
    const { sut, oauthStub } = makeSut();

    const error = new Error('Internal server error');

    vitest.spyOn(oauthStub, 'getAccessToken').mockImplementation(() => {
      throw error;
    });

    const response = await sut.handle({});

    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual(new Error('Internal server error'));
  });
});
