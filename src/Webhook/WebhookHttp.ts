import Fastify from "fastify";
import { logger } from "..";
import routes from "./Routes";
const fastify = Fastify({ logger: true });
import env from "../Utils/env";

export default class WebhookHttp {
  handler() {
    fastify.register(
      async (route, options) => {
        route.addHook("preHandler", async (request, reply) => {
          logger.warn("Hook!");
        });
        routes.forEach((item) => {
          route[item.type](item.url, item.schema, item.handler);
          // switch (item.type) {
          //   case ApiMethods.POST:
          //     route.post(item.url, item.schema, item.handler);
          //     break;
          //   case ApiMethods.PATCH:
          //     route.patch(item.url, item.schema, item.handler);
          //     break;
          //   case ApiMethods.PUT:
          //     route.put(item.url, item.schema, item.handler);
          //     break;
          //   case ApiMethods.DELETE:
          //     route.delete(item.url, item.schema, item.handler);
          //     break;
          //   default:
          //     route.get(item.url, item.schema, item.handler);
          // }
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
