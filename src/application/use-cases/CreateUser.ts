import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import bcrypt from "bcrypt"
import { AppError } from "../../interfaces/http/middlewares/AppError";

export class CreateUser {
    constructor(private userRepository: UserRepository) {}

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