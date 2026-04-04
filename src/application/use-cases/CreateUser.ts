import bcrypt from "bcrypt"
import { AppError } from "../../interfaces/http/middlewares/AppError";
import { ICreateUser } from "./ICreateUser.interface";
import { IUserRepository } from "../../domain/repositories/IUserRepository.interface";

export class CreateUser implements ICreateUser{
    constructor(private userRepository: IUserRepository) {}

    async execute(data: { email:string; password: string; name:string }) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if(existingUser) throw new AppError("Usuario ya existente",400);
        const hashedPassword = await bcrypt.hash(data.password,10);
        return this.userRepository.createUser({
            ...data,
            password: hashedPassword
        });
    }
}