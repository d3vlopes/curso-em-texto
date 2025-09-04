import {
  userGithubProviderMock,
  userGoogleProviderMock,
  UserRepositoryStub,
} from '@/__tests__/stubs/repositories/UserRepositoryStub';
import { GENERATE_MOCK_TOKEN, JWTStub } from '@/__tests__/stubs/JWTStub';

import { type OAuthLoginInput, OAuthLoginUseCase } from './OAuthLoginUseCase';
import { ValidatorStub } from '@/__tests__/stubs/ValidatorStub';

const makeSut = () => {
  const userRepositoryStub = new UserRepositoryStub();
  const jwtStub = new JWTStub();
  const validatorStub = new ValidatorStub();

  const sut = new OAuthLoginUseCase(userRepositoryStub, jwtStub, validatorStub);

  return {
    userRepositoryStub,
    jwtStub,
    sut,
    validatorStub,
  };
};

describe('OAuthLoginUseCase', () => {
  it('should return error if email is invalid', async () => {
    const { validatorStub, sut } = makeSut();

    vitest.spyOn(validatorStub, 'isEmail').mockReturnValueOnce(false);

    const data: OAuthLoginInput = {
      provider: 'github',
      oauthData: {
        ...userGoogleProviderMock,
        id: 'oauth-id',
        email: 'invalid-email.com',
      },
    };

    const response = await sut.execute(data);

    expect(response).toStrictEqual({
      data: null,
      error: 'Invalid email',
    });
  });

  it('should call userRepository.findByEmail with correct values', async () => {
    const { sut, userRepositoryStub } = makeSut();

    const spyOnFindByEmail = vitest.spyOn(userRepositoryStub, 'findByEmail');

    const data: OAuthLoginInput = {
      provider: 'google',
      oauthData: { ...userGoogleProviderMock, id: 'oauth-id' },
    };

    await sut.execute(data);

    expect(spyOnFindByEmail).toHaveBeenCalledWith(userGoogleProviderMock.email);
  });

  it('should call usersRepository.update if user already exists with new provider data', async () => {
    const { sut, userRepositoryStub } = makeSut();

    const spyOnUpdate = vitest
      .spyOn(userRepositoryStub, 'update')
      .mockResolvedValueOnce({
        ...userGoogleProviderMock,
        githubId: userGoogleProviderMock.id,
      });

    const data: OAuthLoginInput = {
      provider: 'github',
      oauthData: { ...userGoogleProviderMock, id: 'oauth-id' },
    };

    await sut.execute(data);

    expect(spyOnUpdate).toHaveBeenCalledWith(userGoogleProviderMock.id, {
      githubId: data.oauthData.id,
    });
  });

  it('should call userRepository.create if user does not exist', async () => {
    const { sut, userRepositoryStub } = makeSut();

    vitest.spyOn(userRepositoryStub, 'findByEmail').mockResolvedValueOnce(null);

    const spyOnCreate = vitest
      .spyOn(userRepositoryStub, 'create')
      .mockResolvedValueOnce(userGoogleProviderMock);

    const data: OAuthLoginInput = {
      provider: 'google',
      oauthData: { ...userGoogleProviderMock, id: 'oauth-id' },
    };

    const createData = {
      email: data.oauthData.email,
      name: data.oauthData.name,
      avatar: data.oauthData.avatar,
      googleId: data.oauthData.id,
    };

    await sut.execute(data);

    expect(spyOnCreate).toHaveBeenCalledWith(createData);
  });

  it('should call JWT.generateToken with correct values', async () => {
    const { sut, jwtStub, userRepositoryStub } = makeSut();

    vitest
      .spyOn(userRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(userGithubProviderMock);
    const spyOnJWTStub = vitest.spyOn(jwtStub, 'generateToken');

    const data: OAuthLoginInput = {
      provider: 'github',
      oauthData: { ...userGithubProviderMock, id: 'oauth-id' },
    };

    await sut.execute(data);

    expect(spyOnJWTStub).toHaveBeenCalledWith({
      userId: userGithubProviderMock.id,
    });
  });

  it('should return token if login is successful', async () => {
    const { sut } = makeSut();

    const data: OAuthLoginInput = {
      provider: 'github',
      oauthData: { ...userGithubProviderMock, id: 'oauth-id' },
    };

    const response = await sut.execute(data);

    expect(response).toStrictEqual({
      data: {
        token: GENERATE_MOCK_TOKEN,
      },
      error: null,
    });
  });
});
