import { FastifyReply, FastifyRequest } from "fastify";
import BaseApi, { ApiMethods } from "../../Utils/BaseApi";

export default class Ping extends BaseApi<Promise<object>> {
  url = "/ping";
  method: ApiMethods = ApiMethods.GET;

  async handler(req: FastifyRequest, res: FastifyReply) {
    return { message: "Pong!" };
  }
}
