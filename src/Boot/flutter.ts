import { ChannelType, Client, EmbedBuilder, hyperlink } from "discord.js";
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

  scheduleJob(new Date(2022, 10, 6, 20, 20, 0), () => {
    const embeds = new EmbedBuilder()
      .setTitle("Flutter Roadmap, Begin!")
      .setDescription(
        `
      BELUM START INI CUMAN TEST

      Your first assignment would be so simple, all you need to do is simply preparing your environment
      for developing Flutter and of course Dart.

      Here is, your starting point:
      ${hyperlink("Installing Dart by Mr Erico", "https://youtu.be/asNdz10WR6w")}

      ------------------------------------------------------------

      That's all from me, meet again at your week's 4. Shall we?
      `
      )
      .setImage("https://i.pinimg.com/564x/ee/fe/5f/eefe5f009c7105b18b8df4d86f907ce3.jpg");

    channel.send({ embeds: [embeds] });
  });
}
