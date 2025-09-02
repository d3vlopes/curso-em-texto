import type { UserModelData } from '@/data/models/User';
import type {
  CreateUserData,
  UserRepository,
} from '@/data/repositories/interfaces/UserRepository';

import { db, usersTable } from '@/data';

export class UserRepositoryImp implements UserRepository {
  async create(data: CreateUserData): Promise<UserModelData> {
    const [result] = await db.insert(usersTable).values(data).returning();

    return result;
  }
}
