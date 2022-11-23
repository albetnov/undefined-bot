import refreshChannels from "../../Refresher/RefreshChannels";
import refreshRoles from "../../Refresher/RefreshRoles";
import BaseApi, { ApiHandlerInterface, ApiMethods } from "../../Utils/BaseApi";

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
    } else {
      await refreshChannels();
      await refreshRoles();
    }
    return { message: "Cache refreshed!" };
  }
}
