import BaseApi, { ApiHandlerInterface, ApiMethods } from "../../Utils/BaseApi";
import jSchema from "fluent-json-schema";
import { ChannelType } from "discord.js";
import { FastifyReply } from "fastify";

interface BodyInterface {
  channel_id: string;
  message: string;
}

export default class SendMessage extends BaseApi<Promise<FastifyReply>> {
  url = "/sendMessage";
  method: ApiMethods = ApiMethods.POST;

  schema() {
    return this.extendSchema({
      body: jSchema
        .object()
        .prop("channel_id", jSchema.string().required())
        .prop("message", jSchema.string().required()),
    });
  }

  async handler({ req, client, res }: ApiHandlerInterface) {
    const body = req.body as BodyInterface;

    const channel = client.channels.cache.get(body.channel_id);
    if (!channel || channel.type !== ChannelType.GuildText) {
      return res.status(400).send({ error: "Channel ID invalid" });
    }

    channel.send(body.message);

    return res.send({ message: "Success!" });
  }
}
