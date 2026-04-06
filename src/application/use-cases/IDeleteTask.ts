import { ITask } from "../../domain/entities/ITask.interface";

export interface IDeleteTask {
    execute(id: string): Promise<ITask | null>;
}