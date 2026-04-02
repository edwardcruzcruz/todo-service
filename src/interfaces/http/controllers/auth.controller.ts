import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUser } from '../../../application/use-cases/CreateUser';
import { CreateUserBody } from '../schemas/create-user.schema';
import { LoginUser } from '../../../application/use-cases/LoginUser';
import { jwtAdapter } from '../../../app';

export class AuthController {
    constructor(
        private readonly createUserUseCase: CreateUser,
        private readonly loginUserCase: LoginUser
    ) {}

    async register(req: FastifyRequest<{ Body: CreateUserBody }>, reply: FastifyReply) {
        const user = await this.createUserUseCase.execute(req.body);
        return reply.send(user);
    }

    async login(req: FastifyRequest<{ Body: { email: string; password: string} }>, reply: FastifyReply) {
        const { email, password } = req.body;
        const user = await this.loginUserCase.execute(email,password);
        const token = await jwtAdapter.generateToken({userId: user.id,email: user.email})
        console.log(token)
        return reply.send({ user,token });
    }
}