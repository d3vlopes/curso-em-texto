import type { Controller } from '@/presentation/contracts/Controller';
import { CreateExampleController } from '@/presentation/controllers/Example/CreateExample/CreateExampleController';

import { makeCreateExampleUseCase } from '@/factories/useCases/Example/CreateExampleUseCaseFactory';

export const makeCreateExampleController = (): Controller => {
  const exampleUseCase = makeCreateExampleUseCase();

  const controller = new CreateExampleController(exampleUseCase);

  return controller;
};
