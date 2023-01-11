import { existsSync, mkdirSync } from "fs";
import { logger } from "..";
import refreshChannels from "../Refresher/RefreshChannels";
import refreshRoles from "../Refresher/RefreshRoles";
import refreshSpiritServer from "../Refresher/RefreshSpiritServer";

export default function refreshCache() {
  const dir = __dirname + "/../Cache/";

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  refreshChannels();
  refreshRoles();
  refreshSpiritServer();
  logger.info("[Boot]: Cache refreshed!");
}
