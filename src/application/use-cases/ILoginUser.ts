import { IUser } from "../../domain/entities/IUser.interface";

export interface ILoginUser {
    execute (email:string, password: string): Promise<IUser>;
}