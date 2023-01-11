import refreshChannels from "../../Refresher/RefreshChannels";
import refreshRoles from "../../Refresher/RefreshRoles";
import BaseListener, { SocketListenerHandler } from "./BaseListener";
import { z } from "zod";
import refreshSpiritServer from "../../Refresher/RefreshSpiritServer";

export default class RefreshCache extends BaseListener {
  socket: string = "RefreshCache";

  handler({ params }: SocketListenerHandler) {
    const [body, callback] = params;

    const bodySchema = z.object({
      channels: z.boolean().optional(),
      roles: z.boolean().optional(),
      spiritServer: z.boolean().optional()
    });

    const result = bodySchema.safeParse(body);

    if (result.success) {
      if (result.data.channels) {
        refreshChannels();
      } else if (result.data.roles) {
        refreshRoles();
      } else if(result.data.spiritServer) {
        refreshSpiritServer();
      } else {
        refreshChannels();
        refreshRoles();
        refreshSpiritServer();
      }
    }

    callback({
      success: result.success,
    });
  }
}
