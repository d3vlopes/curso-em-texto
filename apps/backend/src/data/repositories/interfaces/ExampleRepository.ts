import { ExampleModelData } from '@/data/models/Example';

export type CreateExampleData = Omit<ExampleModelData, 'id' | 'createdAt'>;

export interface ExampleRepository {
  findByEmail(email: string): Promise<ExampleModelData | null>;
  create(data: CreateExampleData): Promise<ExampleModelData>;
}
