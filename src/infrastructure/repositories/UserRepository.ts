import { IUser } from "../../domain/entities/IUser.interface";
import { IUserRepository } from "../../domain/repositories/IUserRepository.interface";
import { prisma } from "../database/client";

export class UserRepository implements IUserRepository {
    constructor(private readonly prismaClient: typeof prisma) {}

    async findByEmail(email: string): Promise<IUser | null> {
        const user = await this.prismaClient.user.findUnique({ where: {email} });
        if( !user ) return null;
        return user;
    }

    async createUser(userData: Omit<IUser, 'id' | 'created_at'>): Promise<IUser> {
        const { tasks, ...cleanData } = userData;
        return this.prismaClient.user.create({ data: 
            {
                ...cleanData
            }
        });
    }

    async findById(id: string): Promise<IUser | null> {
        const user = await this.prismaClient.user.findUnique({ where: {id} });
        return user || null; 
    }
}