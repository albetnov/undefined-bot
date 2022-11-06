import { ChannelType, Client } from "discord.js";
import { gracefulShutdown, scheduleJob } from "node-schedule";

/** @WIP */
export default async function flutter(client: Client) {
  console.log("Resetting All Jobs");
  await gracefulShutdown();

  const channel = client.channels.cache.get(process.env.FLUTTER_CHANNEL_ID!);

  if (!channel || channel.type !== ChannelType.GuildText) {
    console.log("incompitable channel found");
    return;
  }

  scheduleJob(new Date(2022, 10, 6, 14, 8, 0), () => {
    channel.send("Test Schedule Job");
  });
}
