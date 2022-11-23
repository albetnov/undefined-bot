import { ChannelType } from "discord.js";
import BaseApi, { ApiMethods, ApiHandlerInterface } from "../../Utils/BaseApi";
import env from "../../Utils/env";

export default class ChannelList extends BaseApi<Promise<object>> {
  url = "/channelList";
  method: ApiMethods = ApiMethods.GET;

  async handler({ req, res, client }: ApiHandlerInterface) {
    return client.channels.cache.filter(
      (item) => item.type === ChannelType.GuildText && item.guildId === env("GUILD_ID")
    );
  }
}
