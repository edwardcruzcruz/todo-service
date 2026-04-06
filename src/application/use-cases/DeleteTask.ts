import { ITaskRepository } from "../../domain/repositories/ITaskRepository.interface";
import { IDeleteTask } from "./IDeleteTask";

export class DeleteTask implements IDeleteTask{
    constructor(private readonly taskRepository: ITaskRepository) {}

    async execute(id: string) {
        return this.taskRepository.delete(id);
    }
}