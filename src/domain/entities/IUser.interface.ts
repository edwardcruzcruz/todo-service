import { ITask } from "./ITask.interface";

export interface IUser {
    id: string;
    email: string;
    password: string;
    name: string;
    created_at: Date;

    tasks?:ITask[]
}