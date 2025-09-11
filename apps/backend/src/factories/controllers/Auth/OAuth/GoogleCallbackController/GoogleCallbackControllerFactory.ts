import type { FastifyInstance } from 'fastify';

import { OAuthAdapter } from '@/app/adapters/OAuth';

import { makeOAuthLoginUseCase } from '@/factories/useCases/Auth/OAuthLoginUseCase/OAuthLoginUseCaseFactory';

import type { Controller } from '@/presentation/contracts/Controller';

import { GoogleOAuthCallbackController } from '@/presentation/controllers/Auth/GoogleOAuthCallback/GoogleOAuthCallbackController';

export const makeGoogleCallbackController = (
  app: FastifyInstance
): Controller => {
  const oauthLoginUseCase = makeOAuthLoginUseCase();
  const googleOAuthAdapter = new OAuthAdapter(app.googleOAuth2);

  const controller = new GoogleOAuthCallbackController(
    oauthLoginUseCase,
    googleOAuthAdapter
  );

  return controller;
};
