import { IUser } from "../../domain/entities/IUser.interface";

export interface ICreateUser {
    execute(data: { email:string; password: string; name:string }): Promise<IUser>;
}