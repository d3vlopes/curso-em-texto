/* eslint-disable no-console */
import type { ExampleModelData } from '@/data/models/Example';
import type { CreateExampleData } from '@/data/repositories/interfaces/ExampleRepository';

import type { UseCase } from '@/services/contracts/UseCase';

import type { Controller } from '@/presentation/contracts/Controller';

export type CreateExampleRequestType = Omit<
  CreateExampleData,
  'username' | 'createdAt' | 'id'
>;

interface CreateExampleRequest extends CreateExampleRequestType {
  example?: string;
}

type RequiredFields = keyof CreateExampleRequestType;

const requiredFields: RequiredFields[] = ['firstName', 'lastName', 'email'];

export class CreateExampleController implements Controller {
  constructor(
    private readonly createExampleUseCase: UseCase<
      CreateExampleRequestType,
      ExampleModelData
    >
  ) {}

  async handle(input: unknown) {
    const request = input as CreateExampleRequest;

    console.log('request.example =>', request.example);

    for (const field of requiredFields) {
      if (!request[field]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param: ${field}`),
        };
      }
    }

    try {
      const { error, data } = await this.createExampleUseCase.execute(request);

      if (error) {
        return {
          statusCode: 400,
          body: new Error(error),
        };
      }

      return {
        statusCode: 201,
        body: data,
      };
    } catch {
      return {
        statusCode: 500,
        body: new Error('Server error'),
      };
    }
  }
}
