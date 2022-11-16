import refreshChannels from "../Refresher/RefreshChannels";
import refreshRoles from "../Refresher/RefreshRoles";
import BaseListener, { HandlerProps } from "../Utils/BaseListener";

export class RefreshCache extends BaseListener {
  name = "RefreshCache";

  async handler({ response, parameters, client }: HandlerProps) {
    if (parameters.length > 0) {
      const value = parameters[0].toLowerCase();

      switch (value) {
        case "roles":
          await refreshRoles();
          response.channel.send("Roles cache refreshed!");
          return;
        case "channels":
          await refreshChannels(client);
          response.channel.send("Channels cache refreshed!");
          return;
        default:
          response.channel.send("Parameter invalid!");
          return;
      }
    }
    await refreshChannels(client);
    await refreshRoles();
    response.channel.send("All cache has been refreshed!");
  }
}
