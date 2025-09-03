import type { UserModelData } from '@/data/models/User';
import type { UserRepository } from '@/data/repositories/interfaces/UserRepository';
import type { JWT } from '@/services/contracts/JWT';
import type { UseCase } from '@/services/contracts/UseCase';
import type { Validator } from '@/services/contracts/Validator';

interface OAuthUserData {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
}

export interface OAuthLoginInput {
  provider: 'google' | 'github';
  oauthData: OAuthUserData;
}

export interface OAuthLoginResponse {
  token: string;
}

export class OAuthLoginUseCase
  implements UseCase<OAuthLoginInput, OAuthLoginResponse>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwt: JWT,
    private readonly validator: Validator
  ) {}

  async execute({ provider, oauthData }: OAuthLoginInput) {
    const isEmailValid = this.validator.isEmail(oauthData.email);

    if (!isEmailValid) {
      return {
        data: null,
        error: 'Invalid email',
      };
    }

    const existingUser = await this.userRepository.findByEmail(oauthData.email);

    const user = existingUser
      ? await this.updateUserProvider(existingUser, provider, oauthData.id)
      : await this.createNewUser(provider, oauthData);

    const token = this.jwt.generateToken({
      userId: user.id,
    });

    return {
      data: { token },
      error: null,
    };
  }

  private getProviderKey(provider: 'google' | 'github') {
    return provider === 'google' ? 'googleId' : 'githubId';
  }

  private createNewUser(
    provider: 'google' | 'github',
    oauthData: OAuthUserData
  ): Promise<UserModelData> {
    const providerKey = this.getProviderKey(provider);

    return this.userRepository.create({
      email: oauthData.email,
      name: oauthData.name,
      avatar: oauthData.avatar,
      [providerKey]: oauthData.id,
    });
  }

  private updateUserProvider(
    user: UserModelData,
    provider: 'google' | 'github',
    providerId: string
  ): Promise<UserModelData> {
    const providerKey = this.getProviderKey(provider);

    if (user[providerKey]) {
      return Promise.resolve(user);
    }

    return this.userRepository.update(user.id, { [providerKey]: providerId });
  }
}
