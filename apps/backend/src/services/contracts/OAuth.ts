export interface OAuth {
  getAccessToken(req: unknown): Promise<string | null>;
}
