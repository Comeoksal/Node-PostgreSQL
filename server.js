import dotenv from 'dotenv';
import Fastify from "fastify";
import { dbconnect } from './database.js';
import autoload from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({
    logger: true
});

fastify.register(autoload, {
    dir: join(__dirname, "controller")
});

const PORT = process.env.SERVER_PORT;
const start = async () => {
    try {
        await dbconnect();
        fastify.listen({ port: PORT }, async () => {
            console.log(`Server Running at http://localhost:${PORT}/`);
        });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();