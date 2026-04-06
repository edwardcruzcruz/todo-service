import { FastifyReply, FastifyRequest } from "fastify";

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // This looks for the 'Authorization: Bearer <token>' header
    await request.jwtVerify(); 
  } catch (err) {
    reply.status(401).send({ message: 'No autorizado: Token inválido' });
  }
};