"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./plugins/auth"));
const auth_2 = require("./routes/auth");
const invoices_1 = require("./routes/invoices");
dotenv_1.default.config();
const server = (0, fastify_1.default)({
    logger: true
});
server.register(cors_1.default, {
    origin: '*'
});
server.register(auth_1.default);
server.register(auth_2.authRoutes, { prefix: '/api/auth' });
server.register(invoices_1.invoiceRoutes, { prefix: '/api/invoices' });
server.get('/api/health', async (request, reply) => {
    return { status: 'healthy', timestamp: new Date().toISOString() };
});
const start = async () => {
    try {
        const port = parseInt(process.env.PORT || '3001', 10);
        await server.listen({ port, host: '0.0.0.0' });
        server.log.info(`Server listening on port ${port}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
