import { ITask } from "../../domain/entities/ITask.interface";

export interface IGetAllTasks {
    execute(): Promise<ITask[]>;
}