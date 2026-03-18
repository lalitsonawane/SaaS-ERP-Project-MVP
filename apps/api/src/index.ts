import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import authPlugin from './plugins/auth';
import { authRoutes } from './routes/auth';
import { invoiceRoutes } from './routes/invoices';

dotenv.config();

const server = Fastify({
  logger: true
});

server.register(cors, {
  origin: '*'
});

server.register(authPlugin);
server.register(authRoutes, { prefix: '/api/auth' });
server.register(invoiceRoutes, { prefix: '/api/invoices' });

server.get('/api/health', async (request: FastifyRequest, reply: FastifyReply) => {
  return { status: 'healthy', timestamp: new Date().toISOString() };
});

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3001', 10);
    await server.listen({ port, host: '0.0.0.0' });
    server.log.info(`Server listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
