import { ITaskRepository } from "../../domain/repositories/ITaskRepository.interface";
import { IGetTaskById } from "./IGetTaskById";

export class GetTaskById implements IGetTaskById{
    constructor(private readonly taskRepository: ITaskRepository) {}

    async execute(id: string) {
        return this.taskRepository.findById(id);
    }
}