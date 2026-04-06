import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTask } from "../../../application/use-cases/CreateTask";
import { CreateTaskBody } from "../schemas/create-task.schema";
import { GetAllTasks } from "../../../application/use-cases/GetAllTasks";
import { GetTaskById } from "../../../application/use-cases/GetTaskById";

export class TaskController {
    constructor(
        private readonly createTaskUserCase: CreateTask,
        private readonly getAllTasksUserCase: GetAllTasks,
        private readonly getTaskByIdUserCase: GetTaskById
    ) {}

    async get(req: FastifyRequest, reply: FastifyReply) {
        const tasks = await this.getAllTasksUserCase.execute();
        return reply.send(tasks);
    }

    async getById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const task = await this.getTaskByIdUserCase.execute(req.params.id);
        return reply.send(task);
    }

    async create(req: FastifyRequest<{ Body: CreateTaskBody }>, reply: FastifyReply) {
        const task = await this.createTaskUserCase.execute(req.body);
        return reply.send(task);
    }
}