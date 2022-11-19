import { existsSync, mkdirSync } from "fs";
import { logger } from "..";
import refreshChannels from "../Refresher/RefreshChannels";
import refreshRoles from "../Refresher/RefreshRoles";

export default function refreshCache() {
  const dir = __dirname + "/../Cache/";

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  refreshChannels();
  refreshRoles();
  logger.info("Cache refreshed!");
}
