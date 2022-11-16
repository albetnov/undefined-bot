import { Client } from "discord.js";
import { existsSync, mkdirSync } from "fs";
import { logger } from "..";
import refreshChannels from "../Refresher/RefreshChannels";
import refreshRoles from "../Refresher/RefreshRoles";

export default function refreshCache(client: Client) {
  const dir = __dirname + "/../Cache/";

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  refreshChannels(client);
  refreshRoles();
  logger.info("Cache refreshed!");
}
