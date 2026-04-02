import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUser } from '../../../application/use-cases/CreateUser';
import { CreateUserBody } from '../schemas/create-user.schema';

export class AuthController {
    constructor(private readonly createUserUseCase: CreateUser) {}

    async register(req: FastifyRequest<{ Body: CreateUserBody }>, reply: FastifyReply) {
        try {
            const user = await this.createUserUseCase.execute(req.body);
            return reply.send(user);
        } catch (err) {
            return reply.status(400).send({ error: 'Ocurrio un error, intentarlo mas tarde' })
        }
    }
}