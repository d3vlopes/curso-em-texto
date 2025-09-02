export interface UserModelData {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
  googleId?: string | null;
  githubId?: string | null;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
