import { ITaskRepository } from "../../domain/repositories/ITaskRepository.interface";
import { IUserRepository } from "../../domain/repositories/IUserRepository.interface";
import { AppError } from "../../interfaces/http/middlewares/AppError";
import { ICreateTask } from "./ICreateTask.interface";

export class CreateTask implements ICreateTask{
    constructor(private readonly taskRepository: ITaskRepository,private readonly userRepository: IUserRepository) {}

    async execute(data: { title:string; description: string; completed: boolean; user_id:string },userId: string) {
        const existingUser = await this.userRepository.findById(userId);
        if(existingUser == null) throw new AppError("El usuario no existe",404);
        return this.taskRepository.create({
            ...data,
            user_id: userId
        });
    }
}