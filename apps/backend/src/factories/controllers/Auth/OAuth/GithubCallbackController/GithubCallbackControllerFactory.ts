import type { FastifyInstance } from 'fastify';

import { OAuthAdapter } from '@/app/adapters/OAuth';

import { makeOAuthLoginUseCase } from '@/factories/useCases/Auth/OAuthLoginUseCase/OAuthLoginUseCaseFactory';

import type { Controller } from '@/presentation/contracts/Controller';

import { GithubOAuthCallbackController } from '@/presentation/controllers/Auth/GithubOAuthCallback/GithubOAuthCallbackController';

export const makeGithubCallbackController = (
  app: FastifyInstance
): Controller => {
  const oauthLoginUseCase = makeOAuthLoginUseCase();
  const githubOAuthAdapter = new OAuthAdapter(app.githubOAuth2);

  const controller = new GithubOAuthCallbackController(
    oauthLoginUseCase,
    githubOAuthAdapter
  );

  return controller;
};
