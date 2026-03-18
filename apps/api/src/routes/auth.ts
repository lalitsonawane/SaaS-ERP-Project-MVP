import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import bcrypt from 'bcryptjs';
import { db, users, tenants } from 'db';
import { eq } from 'drizzle-orm';

export const authRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.post<{ Body: any }>('/register', async (request, reply) => {
    const { email, password, name, tenantName } = request.body;
    
    // Check if user exists
    const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing) {
      return reply.status(400).send({ error: 'Email already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Provide a simple transaction-like block (Drizzle supports real transactions too):
    const newTenantData = await db.transaction(async (tx) => {
      // Create Tenant First
      const [newTenant] = await tx.insert(tenants).values({
        name: tenantName,
      }).returning();
  
      // Create User mapped to Tenant
      const [newUser] = await tx.insert(users).values({
        tenantId: newTenant.id,
        email,
        passwordHash,
        name,
        role: 'admin' // First user in tenant is admin
      }).returning();
      
      return { newTenant, newUser };
    });

    // Generate JWT
    const token = server.jwt.sign({ 
      id: newTenantData.newUser.id, 
      email: newTenantData.newUser.email, 
      tenantId: newTenantData.newTenant.id, 
      role: newTenantData.newUser.role 
    });
    
    return { token, user: { id: newTenantData.newUser.id, email: newTenantData.newUser.email } };
  });

  server.post<{ Body: any }>('/login', async (request, reply) => {
    const { email, password } = request.body;

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return reply.status(401).send({ error: 'Invalid email or password' });
    }

    const token = server.jwt.sign({ 
      id: user.id, 
      email: user.email, 
      tenantId: user.tenantId, 
      role: user.role 
    });

    return { token, user: { id: user.id, email: user.email } };
  });
  
  server.get('/me', { preValidation: [server.authenticate] }, async (request, reply) => {
    return request.user;
  });
};
