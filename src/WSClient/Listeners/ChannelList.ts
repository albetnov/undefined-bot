import { ChannelType } from "discord.js";
import env from "../../Utils/env";
import BaseListener, { SocketListenerHandler } from "./BaseListener";

export default class ChannelList extends BaseListener {
  socket: string = "ChannelList";

  handler({ params, client }: SocketListenerHandler) {
    const callback = params[0];
    callback({
      list: client.channels.cache.filter(
        (item) => item.type === ChannelType.GuildText && item.guildId === env("GUILD_ID")
      ),
    });
  }
}
