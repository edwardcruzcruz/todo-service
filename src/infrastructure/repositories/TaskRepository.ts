import { ITask } from "../../domain/entities/ITask.interface";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository.interface";
import { prisma } from "../database/client";

export class TaskRepository implements ITaskRepository {
    constructor(private readonly prismaClient: typeof prisma) {}

    async all(){
        return await this.prismaClient.task.findMany();
    }

    async findById(id: string): Promise<ITask | null> {
        const task = await this.prismaClient.task.findUnique({ where: {id} });
        return task || null; 
    }
    
    async create(taskData: Omit<ITask, 'id' | 'created_at' | 'updated_at'>): Promise<ITask> {
        //const { description, ...cleanData } = taskData;
        return this.prismaClient.task.create({
            data: taskData
        });
    }
    
    async update(id: string,taskData: Partial<ITask>): Promise<ITask> {
        const updated = await this.prismaClient.task.update({ 
            where: {id},
            data: {
                title: taskData.title,
                description: taskData.description,
                completed: taskData.completed
            } 
        });
        return updated;
    }

    async delete(id: string): Promise<ITask | null> {
        const task = await this.prismaClient.task.delete({ where: {id} });
        return task || null; 
    }
}