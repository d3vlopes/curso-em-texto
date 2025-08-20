import {
  exampleDataMock,
  ExampleRepositoryStub,
} from '@/__tests__/stubs/repositories/ExampleRepositoryStub';
import { ValidatorStub } from '@/__tests__/stubs/ValidatorStub';

import { CreateExampleUseCase } from './CreateExampleUseCase';

const makeSut = () => {
  const validatorStub = new ValidatorStub();
  const exampleRepositoryStub = new ExampleRepositoryStub();

  const sut = new CreateExampleUseCase(validatorStub, exampleRepositoryStub);

  return {
    validatorStub,
    exampleRepositoryStub,
    sut,
  };
};

describe('CreateExampleUseCase', () => {
  it('should call Validator with correct value', async () => {
    const { sut, validatorStub } = makeSut();

    const spyOnValidator = vitest.spyOn(validatorStub, 'isEmail');

    await sut.execute(exampleDataMock);

    expect(spyOnValidator).toHaveBeenCalledWith(exampleDataMock.email);
  });

  it('should return error if email is invalid', async () => {
    const { validatorStub, sut } = makeSut();

    vitest.spyOn(validatorStub, 'isEmail').mockReturnValueOnce(false);

    const input = {
      ...exampleDataMock,
      email: 'invalid_email',
    };

    const response = await sut.execute(input);

    expect(response).toStrictEqual({
      data: null,
      error: 'Invalid email',
    });
  });

  it('should return error if email already exists', async () => {
    const { sut, exampleRepositoryStub } = makeSut();

    vitest
      .spyOn(exampleRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(exampleDataMock);

    const response = await sut.execute(exampleDataMock);

    expect(response).toStrictEqual({
      data: null,
      error: 'Email already exists',
    });
  });

  it('should call findByEmail method of sampleRepository with correct values ', async () => {
    const { sut, exampleRepositoryStub } = makeSut();

    const spyOnFindByEmail = vitest.spyOn(exampleRepositoryStub, 'findByEmail');

    await sut.execute(exampleDataMock);

    expect(spyOnFindByEmail).toHaveBeenCalledWith(exampleDataMock.email);
  });

  it('should call create method of sampleRepository with correct values', async () => {
    const { sut, exampleRepositoryStub } = makeSut();

    vitest
      .spyOn(exampleRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(null);
    const spyOnCreate = vitest.spyOn(exampleRepositoryStub, 'create');

    const input = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
    };

    await sut.execute(input);

    expect(spyOnCreate).toHaveBeenCalledWith({
      ...input,
      username: 'janesmith',
    });
  });

  it('should create a new user', async () => {
    const { sut, exampleRepositoryStub } = makeSut();

    vitest
      .spyOn(exampleRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(null);

    const input = {
      firstName: exampleDataMock.firstName,
      lastName: exampleDataMock.lastName,
      email: exampleDataMock.email,
    };

    vitest
      .spyOn(exampleRepositoryStub, 'create')
      .mockResolvedValueOnce(exampleDataMock);

    const response = await sut.execute(input);

    expect(response).toStrictEqual({
      data: exampleDataMock,
      error: null,
    });
  });
});
