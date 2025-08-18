import { eq } from 'drizzle-orm';

import type { ExampleModelData } from '@/data/models/Example';

import type {
  CreateExampleData,
  ExampleRepository,
} from '@/data/repositories/interfaces/ExampleRepository';

import { db, exampleUsersTable } from '@/data';

export class ExampleRepositoryImp implements ExampleRepository {
  async findByEmail(email: string): Promise<ExampleModelData | null> {
    const [result] = await db
      .select()
      .from(exampleUsersTable)
      .where(eq(exampleUsersTable.email, email));

    return result;
  }

  async create(data: CreateExampleData): Promise<ExampleModelData> {
    const [result] = await db
      .insert(exampleUsersTable)
      .values(data)
      .returning();

    return result;
  }
}
