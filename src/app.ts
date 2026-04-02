import { CreateUser } from "./application/use-cases/CreateUser";
import Fastify from "fastify";
import { prisma } from "./infrastructure/database/client";
import { UserRepository } from "./infrastructure/repositories/UserRepository";

const userRepository = new UserRepository(prisma);
const createUser = new CreateUser(userRepository);
const PORT = process.env.PORT ? parseInt(process.env.PORT): 3000;
const app = Fastify({ logger: true })

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