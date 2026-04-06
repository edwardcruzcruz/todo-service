import { ITask } from "../../domain/entities/ITask.interface";

export interface ICreateTask {
    execute(taskData: { title:string; description: string; completed: boolean; user_id:string }): Promise<ITask>;
}