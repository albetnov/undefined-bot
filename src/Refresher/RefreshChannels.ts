import { Client } from "discord.js";
import flutter from "../Boot/flutter";
import getChannels from "../Repositories/GetChannels";
import writeToCache from "../Utils/WriteToCache";

export default async function refreshChannels(client: Client) {
  const channels = await getChannels();
  const content = JSON.stringify(channels);
  writeToCache("channels", content);
  flutter(client);
}
