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
    fastify.get('/:id', controller.getById.bind(controller))
    fastify.put('/:id', controller.update.bind(controller))
    fastify.delete('/:id', controller.delete.bind(controller))
}