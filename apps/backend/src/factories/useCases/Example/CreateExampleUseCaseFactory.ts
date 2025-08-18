import { ExampleRepositoryImp } from '@/data/repositories/imp/Example';
import type { ExampleModelData } from '@/data/models/Example';

import type { UseCase } from '@/services/contracts/UseCase';
import {
  CreateExampleUseCase,
  type CreateExampleInputType,
} from '@/services/useCases/Example/CreateExample/CreateExampleUseCase';

import { ValidatorAdapter } from '@/app/adapters/validators';

export const makeCreateExampleUseCase = (): UseCase<
  CreateExampleInputType,
  ExampleModelData
> => {
  const validatorAdapter = new ValidatorAdapter();
  const exampleRepository = new ExampleRepositoryImp();

  const useCase = new CreateExampleUseCase(validatorAdapter, exampleRepository);

  return useCase;
};
