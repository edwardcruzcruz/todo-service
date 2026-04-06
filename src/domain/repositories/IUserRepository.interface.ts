import { IUser } from "../entities/IUser.interface";

export interface IUserRepository {
    createUser(user: Omit<IUser, 'id' | 'created_at'>): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
}