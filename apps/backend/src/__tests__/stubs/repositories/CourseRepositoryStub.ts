import type { CourseModelData } from '@/data/models/Course';
import type {
  CourseRepository,
  CreateCourseData,
} from '@/data/repositories/interfaces/CourseRepository';

export const courseDataMock: CourseModelData = {
  id: '1234',
  title: 'JavaScript Moderno',
  slug: 'javascript-moderno',
  description:
    'Aprenda JavaScript do básico ao avançado com exemplos práticos e projetos reais que vão te preparar para o mercado de trabalho.',
  shortDescription:
    'Curso completo de JavaScript para iniciantes e intermediários',
  authorId: '5678',
  tags: ['javascript', 'programacao', 'web'],
  difficulty: 'beginner',
  estimatedHours: 40,
  status: 'draft',
  isPublic: false,
  enrollmentCount: 0,
  createdAt: new Date('2025-01-15T10:30:00Z'),
  updatedAt: new Date('2025-01-15T10:30:00Z'),
};

export const courseManyDataMock: CourseModelData[] = [
  { ...courseDataMock },
  {
    id: '5678',
    title: 'React Hooks Avançado',
    slug: 'react-hooks-avancado',
    description:
      'Domine os React Hooks e modernize suas aplicações React com as melhores práticas do mercado.',
    shortDescription: 'Curso avançado de React Hooks',
    authorId: '1234',
    tags: ['react', 'hooks', 'javascript'],
    difficulty: 'advanced',
    estimatedHours: 25,
    status: 'published',
    isPublic: true,
    enrollmentCount: 142,
    createdAt: new Date('2025-01-14T15:20:00Z'),
    updatedAt: new Date('2025-01-14T16:45:00Z'),
  },
];

export class CourseRepositoryStub implements CourseRepository {
  async create(_: CreateCourseData): Promise<CourseModelData> {
    return courseDataMock;
  }
}
