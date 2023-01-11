import { existsSync, mkdirSync } from "fs";
import { logger } from "..";
import refreshChannels from "../Refresher/RefreshChannels";
import refreshRoles from "../Refresher/RefreshRoles";
import refreshSpiritServer from "../Refresher/RefreshSpiritServer";
import refreshHolyServer from "../Refresher/RefreshHolyServer";

export default function refreshCache() {
  const dir = __dirname + "/../Cache/";

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  refreshChannels();
  refreshRoles();
  refreshSpiritServer();
  refreshHolyServer();
  logger.info("[Boot]: Cache refreshed!");
}
