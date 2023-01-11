import refreshChannels from "../../Refresher/RefreshChannels";
import refreshRoles from "../../Refresher/RefreshRoles";
import BaseApi, { ApiHandlerInterface, ApiMethods } from "../../Utils/BaseApi";
import refreshSpiritServer from "../../Refresher/RefreshSpiritServer";
import refreshHolyServer from "../../Refresher/RefreshHolyServer";

export default class RefreshCache extends BaseApi<Promise<object>> {
  url = "/refreshCache";
  method: ApiMethods = ApiMethods.POST;

  schema() {
    return this.extendSchema({
      body: {
        type: "object",
        properties: {
          channels: { type: "boolean" },
          roles: { type: "boolean" },
          spiritServer: {type: "boolean"},
          holy: {type: "boolean"}
        },
      },
    });
  }

  async handler({ req }: ApiHandlerInterface) {
    if (!req.body) {
      return {};
    }

    const body = req.body as object;

    if ("channels" in body) {
      await refreshChannels();
    } else if ("roles" in body) {
      await refreshRoles();
    } else if("spirit" in body) {
      await refreshSpiritServer();
    } else if("holy" in body) {
      await refreshHolyServer();
    } else {
      await refreshChannels();
      await refreshRoles();
      await refreshSpiritServer();
      await refreshHolyServer();
    }
    return { message: "Cache refreshed!" };
  }
}
