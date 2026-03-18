import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './db';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '../../apps/api/.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://erp_user:erp_password@localhost:5432/erp_db',
});

async function main() {
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './drizzle' });

  console.log('Enabling Row-Level Security on tenant-isolated tables...');
  
  const tables = [
    'users', 'audit_logs', 'customers', 'products', 'invoices', 'invoice_items',
    'vendors', 'purchase_orders', 'purchase_order_items', 'accounts',
    'journal_entries', 'journal_entry_lines', 'employees', 'leads'
  ];
  const client = await pool.connect();
  
  try {
    for (const table of tables) {
      await client.query(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`);
      // Create policy to restrict access to rows matching the app.current_tenant session variable
      // IF NOT EXISTS logic handled by dropping then creating
      await client.query(`DROP POLICY IF EXISTS tenant_isolation_policy ON ${table};`);
      await client.query(`
        CREATE POLICY tenant_isolation_policy ON ${table}
        AS PERMISSIVE FOR ALL
        TO PUBLIC
        USING (tenant_id = current_setting('app.current_tenant', true)::UUID)
        WITH CHECK (tenant_id = current_setting('app.current_tenant', true)::UUID);
      `);
      
      // We also add a policy for bypassing RLS during background jobs or superadmin (e.g., login)
      await client.query(`DROP POLICY IF EXISTS bypass_rls_policy ON ${table};`);
      await client.query(`
        CREATE POLICY bypass_rls_policy ON ${table}
        AS PERMISSIVE FOR ALL
        TO PUBLIC
        USING (current_setting('app.bypass_rls', true) = 'on')
        WITH CHECK (current_setting('app.bypass_rls', true) = 'on');
      `);
    }
    console.log('Row-Level Security policies applied successfully.');
  } finally {
    client.release();
  }

  console.log('Migration complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
