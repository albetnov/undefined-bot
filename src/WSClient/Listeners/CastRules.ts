import BaseListener, { SocketListenerHandler } from "./BaseListener";
import { CastRules as CastRulesHandler } from "../../Listeners/CastRules";
import { getCacheByKey } from "../../Utils/GetCache";
import { ChannelType } from "discord.js";
import RulesRepository from "../../Repositories/RulesRepository";

export default class CastRules extends BaseListener {
  socket: string = "CastRules";

  async handler({ params, client }: SocketListenerHandler) {
    const callback = params[1];

    const channels = client.channels.cache.get(getCacheByKey("channels", "RulesChannel"));
    if (!channels || channels.type !== ChannelType.GuildText) {
      callback({
        success: false,
      });
      return;
    }
    const castRulesHandler = new CastRulesHandler();
    const rules = await new RulesRepository().mapToKeyAndValue();

    channels.send({
      embeds: [castRulesHandler.embeds(rules)],
      components: [castRulesHandler.buttons()],
    });

    callback({
      success: true,
    });
  }
}
