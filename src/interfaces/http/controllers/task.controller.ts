import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTask } from "../../../application/use-cases/CreateTask";
import { CreateTaskBody } from "../schemas/create-task.schema";

export class TaskController {
    constructor(
        private readonly createTaskUserCase: CreateTask
    ) {}

    async create(req: FastifyRequest<{ Body: CreateTaskBody }>, reply: FastifyReply) {
        const task = await this.createTaskUserCase.execute(req.body);
        return reply.send(task);
    }
}