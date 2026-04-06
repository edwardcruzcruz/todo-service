import { ITaskRepository } from "../../domain/repositories/ITaskRepository.interface";
import { AppError } from "../../interfaces/http/middlewares/AppError";
import { IUpdateTask } from "./IUpdateTask.interface";

export class UpdateTask implements IUpdateTask{
    constructor(private readonly taskRepository: ITaskRepository) {}

    async execute(id: string,taskData: { title:string; description: string; completed: boolean }) {
        const existingTask = this.taskRepository.findById(id);
        if(existingTask == null) throw new AppError("La tarea no existe",404);
        return await this.taskRepository.update(id,taskData);
    }
}