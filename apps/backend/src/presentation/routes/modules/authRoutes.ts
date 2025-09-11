import type { FastifyPluginAsync } from 'fastify';
import OAuthPlugin from '@fastify/oauth2';

import { env } from '@/app/env';

import { adaptRoute } from '@/app/adapters/http/fastify/adaptRoute';

import { makeGoogleCallbackController } from '@/factories/controllers/Auth/OAuth/GoogleCallbackController/GoogleCallbackControllerFactory';
import { makeGithubCallbackController } from '@/factories/controllers/Auth/OAuth/GithubCallbackController/GithubCallbackControllerFactory';

export const authRoutes: FastifyPluginAsync = async (app) => {
  await app.register(OAuthPlugin, {
    name: 'googleOAuth2',
    scope: ['openid', 'profile', 'email'],
    credentials: {
      client: {
        id: env.GOOGLE_CLIENT_ID,
        secret: env.GOOGLE_CLIENT_SECRET,
      },
      auth: OAuthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/auth/google',
    callbackUri: `${env.API_BASE_URL}/api/auth/google/callback`,
  });

  await app.register(OAuthPlugin, {
    name: 'githubOAuth2',
    scope: ['user:email'],
    credentials: {
      client: {
        id: env.GITHUB_CLIENT_ID,
        secret: env.GITHUB_CLIENT_SECRET,
      },
      auth: OAuthPlugin.GITHUB_CONFIGURATION,
    },
    startRedirectPath: '/auth/github',
    callbackUri: `${env.API_BASE_URL}/api/auth/github/callback`,
  });

  app.get(
    '/auth/google/callback',
    // exemplo no frontend
    // <a href="http://localhost:8000/api/auth/google">Login com Google</a>
    adaptRoute(makeGoogleCallbackController(app))
  );

  app.get(
    '/auth/github/callback',
    // exemplo no frontend
    // <a href="http://localhost:8000/api/auth/github">Login com GitHub</a>
    adaptRoute(makeGithubCallbackController(app))
  );
};
