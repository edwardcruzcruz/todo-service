import Fastify from "fastify";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT): 3000;
const app = Fastify({ logger: true })

app.get('/',async () => {
    return { message: 'API running'}
});

const start = async () => {
    try {
        await app.listen({port: PORT, host: "0.0.0.0"});
        console.log('Server running on http://localhost:3000');
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}
start();