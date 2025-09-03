import { JWTAdapter } from '@/app/adapters/jwt';
import { ValidatorAdapter } from '@/app/adapters/validators';

import { UserRepositoryImp } from '@/data/repositories/imp/User';

import type { UseCase } from '@/services/contracts/UseCase';

import {
  OAuthLoginUseCase,
  type OAuthLoginInput,
  type OAuthLoginResponse,
} from '@/services/useCases/auth/OAuthLogin/login/OAuthLoginUseCase';

export const makeOAuthLoginUseCase = (): UseCase<
  OAuthLoginInput,
  OAuthLoginResponse
> => {
  const userRepository = new UserRepositoryImp();
  const jwtAdapter = new JWTAdapter();
  const validatorAdapter = new ValidatorAdapter();

  const useCase = new OAuthLoginUseCase(
    userRepository,
    jwtAdapter,
    validatorAdapter
  );

  return useCase;
};
