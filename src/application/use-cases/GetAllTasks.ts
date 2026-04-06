import { ITaskRepository } from "../../domain/repositories/ITaskRepository.interface";
import { IGetAllTasks } from "./IGetAllTask";

export class GetAllTasks implements IGetAllTasks{
    constructor(private readonly taskRepository: ITaskRepository) {}

    async execute(userId?: string) {
        return this.taskRepository.all(userId);
    }
}