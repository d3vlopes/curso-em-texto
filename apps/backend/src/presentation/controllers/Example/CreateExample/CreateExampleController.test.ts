import type { ExampleModelData } from '@/data/models/Example';

import { UseCaseStub } from '@/__tests__/stubs/UseCaseStub';

import {
  CreateExampleController,
  type CreateExampleRequestType,
} from './CreateExampleController';
import { exampleDataMock } from '@/__tests__/stubs/repositories/ExampleRepositoryStub';

const makeSut = () => {
  const exampleUseCaseStub = new UseCaseStub<
    CreateExampleRequestType,
    ExampleModelData
  >();

  const sut = new CreateExampleController(exampleUseCaseStub);

  return {
    sut,
    exampleUseCaseStub,
  };
};

export const setupExampleControllerTest = () => {
  const { sut, exampleUseCaseStub } = makeSut();

  const requestMock: CreateExampleRequestType = {
    firstName: exampleDataMock.firstName,
    lastName: exampleDataMock.lastName,
    email: exampleDataMock.email,
  };

  return {
    sut,
    requestMock,
    exampleUseCaseStub,
  };
};

describe('CreateExampleController', () => {
  it('should return status code 400 if firstName is not provided', async () => {
    const { sut, requestMock } = setupExampleControllerTest();

    const response = await sut.handle({
      ...requestMock,
      firstName: null,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(new Error('Missing param: firstName'));
  });

  it('should return status code 400 if lastName is not provided', async () => {
    const { sut, requestMock } = setupExampleControllerTest();

    const response = await sut.handle({
      ...requestMock,
      lastName: null,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(new Error('Missing param: lastName'));
  });

  it('should return status code 400 if email is not provided', async () => {
    const { sut, requestMock } = setupExampleControllerTest();

    const response = await sut.handle({
      ...requestMock,
      email: null,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(new Error('Missing param: email'));
  });

  it('should call use case with correct values', async () => {
    const { sut, requestMock, exampleUseCaseStub } =
      setupExampleControllerTest();

    const useCaseSpy = vitest.spyOn(exampleUseCaseStub, 'execute');

    await sut.handle(requestMock);

    expect(useCaseSpy).toHaveBeenCalledWith(requestMock);
  });

  it('should return status code 400 if use case return error', async () => {
    const { sut, requestMock, exampleUseCaseStub } =
      setupExampleControllerTest();

    const useCaseError = new Error('Validation error');

    vitest.spyOn(exampleUseCaseStub, 'execute').mockResolvedValueOnce({
      data: null,
      error: useCaseError.message,
    });

    const response = await sut.handle(requestMock);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(useCaseError);
  });

  it('should return status code 500 if UseCase throw', async () => {
    const { sut, requestMock, exampleUseCaseStub } =
      setupExampleControllerTest();

    const error = new Error('Server error');

    vitest.spyOn(exampleUseCaseStub, 'execute').mockImplementation(() => {
      throw error;
    });

    const response = await sut.handle(requestMock);

    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual(error);
  });

  it('should return status code 201 if use case execute success', async () => {
    const { sut, requestMock, exampleUseCaseStub } =
      setupExampleControllerTest();

    vitest.spyOn(exampleUseCaseStub, 'execute').mockResolvedValueOnce({
      data: exampleDataMock,
      error: null,
    });

    const response = await sut.handle(requestMock);

    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual({
      id: exampleDataMock.id,
      firstName: exampleDataMock.firstName,
      lastName: exampleDataMock.lastName,
      email: exampleDataMock.email,
      username: exampleDataMock.username,
      createdAt: exampleDataMock.createdAt,
    });
  });
});
