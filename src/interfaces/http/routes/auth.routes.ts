import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth.controller";

export const authRoutes = async (
    fastify: FastifyInstance,
    controller: AuthController
) => {
    fastify.post('/register', controller.register.bind(controller))
}