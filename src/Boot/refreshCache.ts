import { Client } from "discord.js";
import { logger } from "..";
import refreshChannels from "../Refresher/RefreshChannels";
import refreshRoles from "../Refresher/RefreshRoles";

export default function refreshCache(client: Client) {
  refreshChannels(client);
  refreshRoles();
  logger.info("Cache refreshed!");
}
