/* eslint-disable @typescript-eslint/no-explicit-any */
import { type GithubAuthResponse } from './GithubOAuthCallbackController';

import {
  emailsMock,
  makeSut,
  mockSuccessFetchAPI,
  userDataMock,
} from './helpers/testSetup';

describe('GithubOAuthCallbackController', () => {
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

  it('should return status code 400 if use case returns error', async () => {
    const { sut, loginUseCaseStub } = makeSut();

    mockSuccessFetchAPI();

    vitest.spyOn(loginUseCaseStub, 'execute').mockResolvedValueOnce({
      data: null,
      error: 'UseCase error',
    });

    const response = await sut.handle({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(new Error('UseCase error'));
  });

  it('should return status code 302 if use case success and use primary verified email from API', async () => {
    const { sut, loginUseCaseStub } = makeSut();

    mockSuccessFetchAPI();

    vitest.spyOn(loginUseCaseStub, 'execute').mockResolvedValueOnce({
      data: { token: 'access-token' },
      error: null,
    });

    const response = await sut.handle({});

    expect(response.statusCode).toBe(302);
    expect(response.redirect?.url).toBe(
      'http://frontend.test/auth/callback?token=access-token'
    );

    expect((globalThis as any).fetch).toHaveBeenNthCalledWith(
      1,
      'https://api.github.com/user',
      {
        headers: {
          Authorization: 'Bearer access_mock_token',
          'User-Agent': 'curso-em-texto',
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    expect((globalThis as any).fetch).toHaveBeenNthCalledWith(
      2,
      'https://api.github.com/user/emails',
      {
        headers: {
          Authorization: 'Bearer access_mock_token',
          'User-Agent': 'curso-em-texto',
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    expect(loginUseCaseStub.execute).toHaveBeenCalledWith({
      provider: 'github',
      oauthData: {
        id: userDataMock.id.toString(),
        email: emailsMock[0].email,
        name: userDataMock.name || userDataMock.login,
        avatar: userDataMock.avatar_url,
      },
    });
  });

  it('should fallback to userData.email if emails API fails', async () => {
    const { sut, loginUseCaseStub } = makeSut();

    (globalThis as any).fetch = vitest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => userDataMock,
      })
      .mockResolvedValueOnce({
        ok: false,
      });

    vitest.spyOn(loginUseCaseStub, 'execute').mockResolvedValueOnce({
      data: { token: 'access-token' },
      error: null,
    });

    const response = await sut.handle({});

    expect(response.statusCode).toBe(302);

    expect(loginUseCaseStub.execute).toHaveBeenCalledWith({
      provider: 'github',
      oauthData: {
        id: userDataMock.id.toString(),
        email: userDataMock.email,
        name: userDataMock.name || userDataMock.login,
        avatar: userDataMock.avatar_url,
      },
    });
  });

  it('should return 400 when unable to get email from GitHub (no primary email and user email null)', async () => {
    const { sut } = makeSut();

    const githubUser: GithubAuthResponse = {
      ...userDataMock,
      email: null,
    };

    const emails = [
      {
        email: 'not-primary@example.com',
        primary: false,
        verified: true,
        visibility: 'public',
      },
      {
        email: 'unverified-primary@example.com',
        primary: true,
        verified: false,
        visibility: 'private',
      },
    ];

    (globalThis as any).fetch = vitest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => githubUser,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => emails,
      });

    const response = await sut.handle({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(
      new Error('Unable to get email from GitHub.')
    );
  });

  it('should use login as name when name is missing', async () => {
    const { sut, loginUseCaseStub } = makeSut();

    const githubUser: GithubAuthResponse = {
      ...userDataMock,
      name: null,
    };

    (globalThis as any).fetch = vitest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => githubUser,
      })
      .mockResolvedValueOnce({
        ok: false,
      });

    vitest.spyOn(loginUseCaseStub, 'execute').mockResolvedValueOnce({
      data: { token: 'access-token' },
      error: null,
    });

    const response = await sut.handle({});

    expect(response.statusCode).toBe(302);

    expect(loginUseCaseStub.execute).toHaveBeenCalledWith({
      provider: 'github',
      oauthData: {
        id: githubUser.id.toString(),
        email: githubUser.email,
        name: githubUser.login,
        avatar: githubUser.avatar_url,
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
