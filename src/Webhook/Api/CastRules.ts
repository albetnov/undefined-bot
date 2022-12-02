import BaseApi, { ApiMethods, ApiHandlerInterface } from "../../Utils/BaseApi";
import { CastRules as CastRulesHandler } from "../../Listeners/CastRules";
import { getCacheByKey } from "../../Utils/GetCache";
import { ChannelType } from "discord.js";
import RulesRepository from "../../Repositories/RulesRepository";

export default class CastRules extends BaseApi<Promise<object>> {
  url = "/castRules";
  method: ApiMethods = ApiMethods.GET;

  async handler({ client }: ApiHandlerInterface) {
    const channels = client.channels.cache.get(getCacheByKey("channels", "RulesChannel"));
    if (!channels || channels.type !== ChannelType.GuildText) {
      return { message: "Incompatible channel" };
    }

    const castRulesHandler = new CastRulesHandler();
    const rules = await new RulesRepository().mapToKeyAndValue();

    channels.send({
      embeds: [castRulesHandler.embeds(rules)],
      components: [castRulesHandler.buttons()],
    });

    return { message: "success!" };
  }
}
