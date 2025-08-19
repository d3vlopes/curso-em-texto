/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ExampleModelData } from '@/data/models/Example';
import type {
  CreateExampleData,
  ExampleRepository,
} from '@/data/repositories/interfaces/ExampleRepository';

export const exampleDataMock: ExampleModelData = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  username: 'johndoe',
  createdAt: new Date(),
};

export const exampleManyDataMock: ExampleModelData[] = [
  { ...exampleDataMock },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@email.com',
    username: 'janedoe',
    createdAt: new Date(),
  },
];

export class ExampleRepositoryStub implements ExampleRepository {
  async findByEmail(_: string): Promise<ExampleModelData | null> {
    return exampleDataMock;
  }

  async create(_: CreateExampleData): Promise<ExampleModelData> {
    return exampleDataMock;
  }

  async list(): Promise<ExampleModelData[]> {
    return exampleManyDataMock;
  }
}
