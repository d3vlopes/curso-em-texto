import { UseCaseStub } from '@/__tests__/stubs/UseCaseStub';

import {
  type OAuthLoginRequest,
  OAuthLoginController,
} from './OAuthLoginController';
import type {
  OAuthLoginInput,
  OAuthLoginResponse,
} from '@/services/useCases/auth/OAuthLogin/login/OAuthLoginUseCase';

const requestMock: Partial<OAuthLoginRequest> = {
  provider: 'github',
  user: {
    id: 'oath_id',
    email: 'johndoe@email.com',
    name: 'John Doe',
    avatar: 'avatar_url',
  },
};

const makeSut = () => {
  const loginUseCaseStub = new UseCaseStub<
    OAuthLoginInput,
    OAuthLoginResponse
  >();
  const sut = new OAuthLoginController(loginUseCaseStub);

  return {
    sut,
    loginUseCaseStub,
  };
};

describe('OAutLoginController', () => {
  it('should return status code 400 if provider is missing', async () => {
    const { sut } = makeSut();

    const request = {
      ...requestMock,
      provider: null,
    };

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(new Error('Missing OAuth data'));
  });

  it('should return status code 400 if user is missing', async () => {
    const { sut } = makeSut();

    const request: Partial<OAuthLoginRequest> = {
      provider: 'google',
    };

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(new Error('Missing OAuth data'));
  });

  it('should return status code 400 if provider is invalid', async () => {
    const { sut } = makeSut();

    const request = {
      ...requestMock,
      provider: 'invalid-provider',
    };

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(new Error('Invalid OAuth provider'));
  });

  it('should call use case if correct values', async () => {
    const { sut, loginUseCaseStub } = makeSut();

    const useCaseSpy = vitest.spyOn(loginUseCaseStub, 'execute');

    await sut.handle(requestMock);

    expect(useCaseSpy).toHaveBeenCalledTimes(1);

    expect(useCaseSpy).toHaveBeenCalledWith({
      provider: requestMock.provider,
      oauthData: {
        id: requestMock.user?.id,
        email: requestMock.user?.email,
        name: requestMock.user?.name,
        avatar: requestMock.user?.avatar,
      },
    });
  });

  it('should return status 400 if use case fails', async () => {
    const { sut, loginUseCaseStub } = makeSut();

    const useCaseError = new Error('UseCase error');

    vitest.spyOn(loginUseCaseStub, 'execute').mockResolvedValueOnce({
      data: null,
      error: useCaseError.message,
    });

    const response = await sut.handle(requestMock);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(useCaseError);
  });

  it('should return status code 500 if UseCase throw', async () => {
    const { sut, loginUseCaseStub } = makeSut();

    const error = new Error('Internal server error');

    vitest.spyOn(loginUseCaseStub, 'execute').mockImplementation(() => {
      throw error;
    });

    const response = await sut.handle(requestMock);

    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual(error);
  });

  it('should return status 200 if use case success', async () => {
    const { sut, loginUseCaseStub } = makeSut();

    vitest.spyOn(loginUseCaseStub, 'execute').mockResolvedValueOnce({
      data: { token: 'access-token' },
      error: null,
    });

    const response = await sut.handle(requestMock);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ token: 'access-token' });
  });
});
