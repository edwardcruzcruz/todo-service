import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./AppError";

export const errorMiddleware = (
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
) => {
    console.log(error)
    if ( error instanceof AppError ) {
        return reply.status(error.statusCode).send({
            error: error.message
        }); 
    }
    return reply.status(500).send({
        error: "Error interno en el servidor"
    });
};