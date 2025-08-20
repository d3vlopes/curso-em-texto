import type { UseCase, UseCaseResponse } from '@/services/contracts/UseCase';

export class UseCaseStub<T, U> implements UseCase<T, U> {
  async execute(): Promise<UseCaseResponse<U | null>> {
    return {
      data: null,
      error: null,
    };
  }
}
