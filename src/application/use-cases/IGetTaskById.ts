import { ITask } from "../../domain/entities/ITask.interface";

export interface IGetTaskById {
    execute(id: string): Promise<ITask | null>;
}