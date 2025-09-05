/* eslint-disable no-console */
import type { FastifyPluginAsync } from 'fastify';
import OAuthPlugin from '@fastify/oauth2';
import type { OAuth2Namespace } from '@fastify/oauth2';

import { env } from '@/app/env';

// import { OAuthLoginController } from '@/presentation/controllers/Auth/OAuthLogin/OAuthLoginController';
// import { makeOAuthLoginUseCase } from '@/factories/useCases/Auth/OAuthLoginUseCase/OAuthLoginUseCaseFactory';

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
    githubOAuth2: OAuth2Namespace;
  }
}

// const makeOAuthCallbackController = () => {
//   const oauthLoginUseCase = makeOAuthLoginUseCase();

//   return new OAuthLoginController(oauthLoginUseCase);
// };

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

  app.get('/auth/google/callback', async (req, res) => {
    try {
      const result =
        await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

      const { access_token } = result.token;

      // Buscar dados do usuário
      const userResponse = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
      );

      const googleUser = await userResponse.json();

      console.log(googleUser);
    } catch (error) {
      console.error('OAuth callback error (Google)', error);
      return res.status(500).send({ error: 'OAuth callback error' });
    }
  });
};
