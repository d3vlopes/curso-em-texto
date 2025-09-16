import { coursesTable, db } from '@/data';

import type { CourseModelData } from '@/data/models/Course';
import type {
  CourseRepository,
  CreateCourseData,
} from '@/data/repositories/interfaces/CourseRepository';

export class CourseRepositoryImp implements CourseRepository {
  async create(data: CreateCourseData): Promise<CourseModelData> {
    const [result] = await db.insert(coursesTable).values(data).returning();

    return result;
  }
}
