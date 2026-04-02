import { FastifyInstance } from "fastify";

interface JwtService {
    generateToken(payload: { userId: string; email: string }): Promise<string>;
    verifyToken(token: string): Promise<any>;
}

export class FastifyJwtAdapter implements JwtService {
    constructor(private readonly app: FastifyInstance) {}

    async generateToken(payload: { userId: string; email: string; }): Promise<string> {
        return this.app.jwt.sign(payload);
    }

    async verifyToken(token: string) {
        return this.app.jwt.verify(token);
    }
}