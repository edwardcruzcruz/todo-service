import { AppError } from "../../interfaces/http/middlewares/AppError";
import bcrypt from 'bcrypt';
import { ILoginUser } from "./ILoginUser";
import { IUserRepository } from "../../domain/repositories/IUserRepository.interface";

export class LoginUser implements ILoginUser{
    constructor(private userRepository: IUserRepository) {}

    async execute(email:string, password: string) {
        const existingUser = await this.userRepository.findByEmail(email);
        if(!existingUser) throw new AppError("Credenciales invalidas",401); 
        const isValid = await bcrypt.compare(password,existingUser.password);
        if (!isValid) throw new AppError("Credenciales invalidas",401)
        return existingUser;
    }
}