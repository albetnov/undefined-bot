import { ChannelType, Client, EmbedBuilder } from "discord.js";
import { gracefulShutdown, scheduleJob } from "node-schedule";
import { logger } from "..";
import { getCacheByKey } from "../Utils/GetCache";

/** @WIP */
export default async function flutter(client: Client) {
  logger.info("Resetting All Jobs");
  await gracefulShutdown();

  const flutterId = getCacheByKey("channels", "FlutterChannel");

  const channel = client.channels.cache.get(flutterId);

  if (!channel || channel.type !== ChannelType.GuildText) {
    logger.warn("incompitable channel found");
    return;
  }

  const PHOTO = "https://i.pinimg.com/564x/ee/fe/5f/eefe5f009c7105b18b8df4d86f907ce3.jpg";

  scheduleJob({ hour: 12 }, () => {
    const embeds = new EmbedBuilder()
      .setTitle("Testing Cron Job")
      .setDescription(`I am still testing the cron job`)
      .setImage(PHOTO);

    channel.send({ embeds: [embeds] });
  });
}
