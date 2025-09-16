export type CourseStatus =
  | 'draft'
  | 'revision'
  | 'published'
  | 'archived'
  | 'blocked';
export type CourseDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface CourseModelData {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string | null;
  authorId: string;
  tags?: string[] | null;
  difficulty: string;
  estimatedHours: number;
  status: string;
  isPublic: boolean;
  enrollmentCount: number;
  createdAt: Date;
  updatedAt: Date;
}
