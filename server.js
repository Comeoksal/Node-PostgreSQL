import Fastify from "fastify";

const fastify = Fastify({
    logger: true
});

fastify.get('/', async (req, reply) => {
    reply.send({ hello: "world" });
})

const PORT = 5000;
const start = async () => {
    try {
        await fastify.listen({ port: PORT }, async () => {
            console.log(`Server Running at http://localhost:${PORT}/`);
        });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();