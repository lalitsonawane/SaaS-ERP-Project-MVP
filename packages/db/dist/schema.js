"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.customers = exports.auditLogs = exports.users = exports.tenants = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.tenants = (0, pg_core_1.pgTable)('tenants', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    plan: (0, pg_core_1.text)('plan').default('Starter').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    tenantId: (0, pg_core_1.uuid)('tenant_id').notNull().references(() => exports.tenants.id),
    email: (0, pg_core_1.text)('email').notNull().unique(),
    name: (0, pg_core_1.text)('name').notNull(),
    role: (0, pg_core_1.text)('role').default('user').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.auditLogs = (0, pg_core_1.pgTable)('audit_logs', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    tenantId: (0, pg_core_1.uuid)('tenant_id').notNull().references(() => exports.tenants.id),
    userId: (0, pg_core_1.uuid)('user_id').notNull().references(() => exports.users.id),
    action: (0, pg_core_1.text)('action').notNull(),
    entityType: (0, pg_core_1.text)('entity_type').notNull(),
    entityId: (0, pg_core_1.uuid)('entity_id').notNull(),
    changes: (0, pg_core_1.text)('changes'), // should be JSONB, mapped to text for now
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
exports.customers = (0, pg_core_1.pgTable)('customers', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    tenantId: (0, pg_core_1.uuid)('tenant_id').notNull().references(() => exports.tenants.id),
    name: (0, pg_core_1.text)('name').notNull(),
    email: (0, pg_core_1.text)('email'),
    phone: (0, pg_core_1.text)('phone'),
    gstin: (0, pg_core_1.text)('gstin'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.products = (0, pg_core_1.pgTable)('products', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    tenantId: (0, pg_core_1.uuid)('tenant_id').notNull().references(() => exports.tenants.id),
    name: (0, pg_core_1.text)('name').notNull(),
    sku: (0, pg_core_1.text)('sku'),
    hsnCode: (0, pg_core_1.text)('hsn_code'),
    price: (0, pg_core_1.text)('price').notNull(), // better than storing floats directly, but a numeric is better
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
