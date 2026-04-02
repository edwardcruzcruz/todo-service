import { UserRepository } from "../../infrastructure/repositories/UserRepository";

export class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(data: { email:string; password: string; name:string }) {
        return this.userRepository.createUser(data);
    }
}