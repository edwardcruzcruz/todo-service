import { AuthController } from "./interfaces/http/controllers/auth.controller";
import { authRoutes } from "./interfaces/http/routes/auth.routes";
import { CreateUser } from "./application/use-cases/CreateUser";
import Fastify from "fastify";
import { prisma } from "./infrastructure/database/client";
import { UserRepository } from "./infrastructure/repositories/UserRepository";
import { errorMiddleware } from "./interfaces/http/middlewares/error.middleware";
import fastifyJwt from "@fastify/jwt";
import { LoginUser } from "./application/use-cases/LoginUser";
import { FastifyJwtAdapter } from "./utils/jwt";
import cors from '@fastify/cors';

const PORT = process.env.PORT ? parseInt(process.env.PORT): 3000;
const userRepository = new UserRepository(prisma);
const createUser = new CreateUser(userRepository);
const loginUser = new LoginUser(userRepository);
const authController = new AuthController(createUser, loginUser);
const app = Fastify({ logger: true })

app.register(cors, {
  origin: process.env.FRONTEND_URL ?? "http://localhost:5173", 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register((instance) => authRoutes(instance, authController),{ prefix: '/api/v1/auth'});

app.setErrorHandler(errorMiddleware);

app.register(fastifyJwt, {
    secret: process.env.JWT_SECRECT || "CHANGEENV",
    sign:{
        expiresIn: process.env.EXPIRESIN || '1h'
    }
});

export const jwtAdapter = new FastifyJwtAdapter(app);

const start = async () => {
    try {
        await app.listen({port: PORT, host: "0.0.0.0"});
        console.log('Server running on http://localhost:3000');
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}
start();