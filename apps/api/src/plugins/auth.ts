import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';

export default fp(async (fastify) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined');
  }

  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
  });

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: string; email: string; tenantId: string; role: string }; // payload type is used for signing and verifying
    user: { id: string; email: string; tenantId: string; role: string }; // user type is return type of `request.user` object
  }
}
