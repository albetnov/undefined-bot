import refreshChannels from "../Refresher/RefreshChannels";
import refreshRoles from "../Refresher/RefreshRoles";
import BaseListener, { HandlerProps } from "../Utils/BaseListener";
import refreshSpiritServer from "../Refresher/RefreshSpiritServer";
import refreshHolyServer from "../Refresher/RefreshHolyServer";

export class RefreshCache extends BaseListener {
  name = "RefreshCache";

  async handler({ response, parameters }: HandlerProps) {
    if (parameters.length > 0) {
      const value = parameters[0].toLowerCase();

      switch (value) {
        case "roles":
          await refreshRoles();
          response.channel.send("Roles cache refreshed!");
          return;
        case "channels":
          await refreshChannels();
          response.channel.send("Channels cache refreshed!");
          return;
        case "spirit":
          await refreshSpiritServer();
          response.channel.send("Spirit Server cache refreshed!");
          return;
        case "holy":
          await refreshHolyServer();
          response.channel.send("Holy Server cache refreshed!");
          return;
        default:
          response.channel.send("Parameter invalid!");
          return;
      }
    }

    Promise.all([refreshChannels(), refreshRoles(), refreshSpiritServer(), refreshHolyServer()]);

    response.channel.send(`All cache has been refreshed!`);
  }
}
