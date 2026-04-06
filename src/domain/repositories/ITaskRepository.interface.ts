import { ITask } from "../entities/ITask.interface";

export interface ITaskRepository {
    all(): Promise<ITask[]>;
    findById(id: string): Promise<ITask | null>;
    create(taskData: Omit<ITask, 'id' | 'created_at' | 'updated_at'>): Promise<ITask>;
    update(id:string, taskData: Partial<ITask>): Promise<ITask>;
    delete(id: string): Promise<ITask | null>;
}