import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import bcrypt from "bcrypt"

export class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(data: { email:string; password: string; name:string }) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if(existingUser) throw new Error("Usuario ya existente");
        const hashedPassword = await bcrypt.hash(data.password,10);
        return this.userRepository.createUser({
            ...data,
            password: hashedPassword
        });
    }
}