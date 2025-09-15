import type { FastifyPluginAsync } from 'fastify';

import { env } from '@/app/env';
import { JWTAdapter } from '@/app/adapters/jwt';

import { UserRepositoryImp } from '@/data/repositories/imp/User';

export const generateTokenRoutes: FastifyPluginAsync = async (app) => {
  const isProduction = env.NODE_ENV === 'production';
  const userRepository = new UserRepositoryImp();

  if (isProduction) return;

  app.post(
    '/auth/generate-token',
    {
      schema: {
        description: 'Endpoint para gerar token JWT para ambiente dev',
        summary: 'Criar token JWT para ambiente dev',
        tags: ['Auth'],
        response: {
          200: {
            description: 'Resposta de sucesso',
            type: 'object',
            properties: {
              token: { type: 'string' },
            },
          },
          500: {
            description: 'Erro interno do servidor',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const email = 'user@exemplo.com';
      const name = 'User Teste';

      try {
        let user = await userRepository.findByEmail(email);

        if (!user) {
          user = await userRepository.create({
            name,
            email,
            role: 'user',
            googleId: '12345',
          });
        }

        const token = new JWTAdapter().generateToken({
          userId: user.id,
        });

        return res.status(200).send({ token });
      } catch (error) {
        req.log.error(error);

        return res.status(500).send({ message: 'Internal Server Error' });
      }
    }
  );
};
