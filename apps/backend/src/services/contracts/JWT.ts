export interface JWTPayload {
  userId: string;
}

export interface JWT {
  generateToken(payload: JWTPayload): string;
  verifyToken(token: string): JWTPayload | null;
}
