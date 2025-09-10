import type { OAuth2Namespace } from '@fastify/oauth2';
declare module 'fastify' {
  interface FastifyRequest {
    userId?: string;
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
    githubOAuth2: OAuth2Namespace;
  }
}
