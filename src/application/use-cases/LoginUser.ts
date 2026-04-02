import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { AppError } from "../../interfaces/http/middlewares/AppError";
import bcrypt from 'bcrypt';

export class LoginUser {
    constructor(private userRepository: UserRepository) {}

    async execute(email:string, password: string) {
        const existingUser = await this.userRepository.findByEmail(email);
        if(!existingUser) throw new AppError("Credenciales invalidas",401); 
        const isValid = await bcrypt.compare(password,existingUser.password);
        if (!isValid) throw new AppError("Credenciales invalidas",401)
        return existingUser;
    }
}