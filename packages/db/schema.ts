import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  plan: text('plan').default('Starter').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: text('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: uuid('entity_id').notNull(),
  changes: text('changes'), // should be JSONB, mapped to text for now
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const customers = pgTable('customers', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  gstin: text('gstin'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  name: text('name').notNull(),
  sku: text('sku'),
  hsnCode: text('hsn_code'),
  price: text('price').notNull(), // better than storing floats directly, but a numeric is better
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const invoices = pgTable('invoices', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  customerId: uuid('customer_id').notNull().references(() => customers.id),
  invoiceNumber: text('invoice_number').notNull(),
  date: timestamp('date').defaultNow().notNull(),
  totalAmount: text('total_amount').notNull(),
  status: text('status').default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const invoiceItems = pgTable('invoice_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  invoiceId: uuid('invoice_id').notNull().references(() => invoices.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').notNull().references(() => products.id),
  quantity: text('quantity').notNull(),
  unitPrice: text('unit_price').notNull(),
  totalPrice: text('total_price').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const vendors = pgTable('vendors', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  gstin: text('gstin'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const purchaseOrders = pgTable('purchase_orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  vendorId: uuid('vendor_id').notNull().references(() => vendors.id),
  poNumber: text('po_number').notNull(),
  date: timestamp('date').defaultNow().notNull(),
  totalAmount: text('total_amount').notNull(),
  status: text('status').default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const purchaseOrderItems = pgTable('purchase_order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  purchaseOrderId: uuid('purchase_order_id').notNull().references(() => purchaseOrders.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').notNull().references(() => products.id),
  quantity: text('quantity').notNull(),
  unitPrice: text('unit_price').notNull(),
  totalPrice: text('total_price').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const accounts = pgTable('accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  name: text('name').notNull(),
  type: text('type').notNull(), // asset, liability, equity, revenue, expense
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const journalEntries = pgTable('journal_entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  date: timestamp('date').defaultNow().notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const journalEntryLines = pgTable('journal_entry_lines', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  journalEntryId: uuid('journal_entry_id').notNull().references(() => journalEntries.id, { onDelete: 'cascade' }),
  accountId: uuid('account_id').notNull().references(() => accounts.id),
  debit: text('debit').notNull().default('0'),
  credit: text('credit').notNull().default('0'),
});

export const employees = pgTable('employees', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  name: text('name').notNull(),
  email: text('email'),
  department: text('department'),
  salary: text('salary').notNull(),
  joinedAt: timestamp('joined_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  name: text('name').notNull(),
  company: text('company'),
  email: text('email'),
  status: text('status').default('new').notNull(), // new, contacted, qualified, lost, won
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
