import { FastifyInstance } from "fastify"
import { TaskController } from "../controllers/task.controller"
import { authenticate } from "../middlewares/auth.middleware"

export const taskRoutes = async (
    fastify: FastifyInstance,
    controller: TaskController
) => {

    fastify.addHook('preHandler', authenticate)

    fastify.post('/', controller.create.bind(controller))
    fastify.get('/', controller.get.bind(controller))
}