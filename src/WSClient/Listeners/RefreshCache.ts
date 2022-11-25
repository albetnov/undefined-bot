import { logger } from "../..";
import refreshChannels from "../../Refresher/RefreshChannels";
import refreshRoles from "../../Refresher/RefreshRoles";
import BaseListener, { SocketListenerHandler } from "./BaseListener";

export default class RefreshCache extends BaseListener {
  socket: string = "RefreshCache";

  handler({ params }: SocketListenerHandler) {
    logger.info("listening");
    const body = params[0];

    if ("channels" in body && body.channels) {
      refreshChannels();
    } else if ("roles" in body && body.roles) {
      refreshRoles();
    } else {
      refreshChannels();
      refreshRoles();
    }
  }
}
