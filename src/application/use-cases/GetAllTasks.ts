import { ITaskRepository } from "../../domain/repositories/ITaskRepository.interface";
import { IGetAllTasks } from "./IGetAllTask";

export class GetAllTasks implements IGetAllTasks{
    constructor(private readonly taskRepository: ITaskRepository) {}

    async execute() {
        return this.taskRepository.all();
    }
}