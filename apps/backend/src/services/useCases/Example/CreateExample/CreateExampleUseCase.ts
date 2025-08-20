import { ExampleModelData } from '@/data/models/Example';
import {
  CreateExampleData,
  ExampleRepository,
} from '@/data/repositories/interfaces/ExampleRepository';

import { UseCase, UseCaseResponse } from '@/services/contracts/UseCase';
import { Validator } from '@/services/contracts/Validator';

export type CreateExampleInputType = Omit<CreateExampleData, 'username'>;

export class CreateExampleUseCase
  implements UseCase<CreateExampleInputType, ExampleModelData>
{
  constructor(
    private readonly validator: Validator,
    private readonly exampleRepository: ExampleRepository
  ) {}

  async execute({
    firstName,
    lastName,
    email,
  }: CreateExampleInputType): Promise<UseCaseResponse<ExampleModelData>> {
    const isEmailValid = this.validator.isEmail(email);

    if (!isEmailValid) {
      return {
        data: null,
        error: 'Invalid email',
      };
    }

    const emailAlreadyRegister =
      await this.exampleRepository.findByEmail(email);

    if (emailAlreadyRegister) {
      return {
        data: null,
        error: 'Email already exists',
      };
    }

    const username = (firstName + lastName).toLowerCase();

    const exampleData = await this.exampleRepository.create({
      firstName,
      lastName,
      email,
      username,
    });

    return {
      data: exampleData,
      error: null,
    };
  }
}
