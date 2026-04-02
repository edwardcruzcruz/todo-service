import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUser } from '../../../application/use-cases/CreateUser';
import { CreateUserBody } from '../schemas/create-user.schema';

export class AuthController {
    constructor(private readonly createUserUseCase: CreateUser) {}

    async register(req: FastifyRequest<{ Body: CreateUserBody }>, reply: FastifyReply) {
        const user = await this.createUserUseCase.execute(req.body);
        return reply.send(user);
    }
}