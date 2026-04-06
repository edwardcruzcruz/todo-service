import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTask } from "../../../application/use-cases/CreateTask";
import { CreateTaskBody } from "../schemas/create-task.schema";
import { GetAllTasks } from "../../../application/use-cases/GetAllTasks";
import { GetTaskById } from "../../../application/use-cases/GetTaskById";
import { UpdateTask } from "../../../application/use-cases/UpdateTask";
import { UpdateTaskBody } from "../schemas/update-task.schema";
import { DeleteTask } from "../../../application/use-cases/DeleteTask";

export class TaskController {
    constructor(
        private readonly createTaskUserCase: CreateTask,
        private readonly getAllTasksUserCase: GetAllTasks,
        private readonly getTaskByIdUserCase: GetTaskById,
        private readonly updateTaskUserCase: UpdateTask,
        private readonly deleteTaskUserCase: DeleteTask
    ) {}

    async get(req: FastifyRequest, reply: FastifyReply) {
        const user = req.user as { userId: string } | undefined;
        const tasks = await this.getAllTasksUserCase.execute(user?.userId);
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

    async update(req: FastifyRequest<{ Params: { id: string },Body: UpdateTaskBody }>, reply: FastifyReply) {
        const task = await this.updateTaskUserCase.execute(req.params.id,req.body);
        return reply.send(task);
    }

    async delete(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const task = await this.deleteTaskUserCase.execute(req.params.id);
        return reply.send(task);
    }
}