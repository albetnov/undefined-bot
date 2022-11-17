import { Client } from "discord.js";
import flutter from "../Boot/flutter";
import ChannelRepository from "../Repositories/ChannelRepository";
import writeToCache from "../Utils/WriteToCache";

export default async function refreshChannels(client: Client) {
  const channels = await new ChannelRepository().mapToKeyAndValue();
  const content = JSON.stringify(channels);
  writeToCache("channels", content);
  flutter(client);
}
