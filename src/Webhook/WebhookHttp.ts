import Fastify from "fastify";
import { logger } from "..";
import routes from "./Routes";
const fastify = Fastify({ logger: true });
import env from "../Utils/env";
import cors from "@fastify/cors";
import TokenRepository from "../Repositories/TokenRepository";

export default class WebhookHttp {
  handler() {
    fastify.register(cors);

    fastify.get("/health", () => {
      return { message: "OK!" };
    });

    fastify.register(
      async (route, options) => {
        route.addHook("preHandler", async (request, reply) => {
          const token = await new TokenRepository().find("token");

          if (!token.exists()) {
            reply.status(403).send({ error: "Token not found. Please try again" });
            return;
          }

          const data = token.data();

          if (data!.expire_at.toDate() < new Date()) {
            reply.status(403).send({ error: "Token expired. Please try again." });
            return;
          }

          const query = request.query as any;
          if (query.adminKey !== data!.value) {
            reply.status(403).send({ error: "Token mismatch" });
            return;
          }
        });
        routes.forEach((item) => {
          route[item.type](item.url, item.schema, item.handler);
        });
      },
      { prefix: "api" }
    );

    fastify.listen(
      { port: env("APP_ENV", "development") === "production" ? 4139 : 3000 },
      (err, address) => {
        if (err) {
          fastify.log.error(err);
          process.exit(1);
        }
        logger.info(`Webhook is ready at: ${address}`);
      }
    );
  }
}
