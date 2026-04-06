import { ITask } from "../../domain/entities/ITask.interface";

export interface IUpdateTask {
    execute(id: string,taskData: { title:string; description: string; completed: boolean}): Promise<ITask>;
}