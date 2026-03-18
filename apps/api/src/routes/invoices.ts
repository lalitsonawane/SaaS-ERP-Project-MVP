import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { db, invoices, invoiceItems, eq } from 'db';

export const invoiceRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  // All invoice routes require authentication
  server.addHook('preValidation', server.authenticate);

  // Get all invoices for the current tenant
  server.get('/', async (request, reply) => {
    // Note: Due to RLS, db queries are automatically isolated if we query via a properly configured Client.
    // However, when bypassing RLS or not using it at the driver level, we explicitly filter:
    const allInvoices = await db.select().from(invoices).where(eq(invoices.tenantId, (request.user as any).tenantId));
    return allInvoices;
  });

  // Create an invoice
  server.post<{ Body: any }>('/', async (request, reply) => {
    const { customerId, invoiceNumber, date, items } = request.body as any;
    
    // Calculate total
    let totalAmount = 0;
    for (const item of items) {
       totalAmount += parseFloat(item.quantity) * parseFloat(item.unitPrice);
    }

    const newInvoiceData = await db.transaction(async (tx) => {
      const tenantId = (request.user as any).tenantId;
      const [newInvoice] = await tx.insert(invoices).values({
        tenantId,
        customerId,
        invoiceNumber,
        date: date ? new Date(date) : undefined,
        totalAmount: totalAmount.toString(),
        status: 'draft'
      }).returning();

      for (const item of items) {
        await tx.insert(invoiceItems).values({
          tenantId,
          invoiceId: newInvoice.id,
          productId: item.productId,
          quantity: item.quantity.toString(),
          unitPrice: item.unitPrice.toString(),
          totalPrice: (parseFloat(item.quantity) * parseFloat(item.unitPrice)).toString()
        });
      }
      
      return newInvoice;
    });

    return reply.status(201).send(newInvoiceData);
  });
};
