import { IUser } from "../entities/IUser.interface";

export interface IUserRepository {
    createUser(user: Omit<IUser, 'id' | 'createdAt'| 'updatedAt'>): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | null>;
}