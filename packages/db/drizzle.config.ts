import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgres://erp_user:erp_password@localhost:5432/erp_db',
  },
});
