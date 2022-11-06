import { ChannelType, ChatInputCommandInteraction, Client, SlashCommandBuilder } from "discord.js";
import flutter from "../Boot/flutter";

export const devSchema = new SlashCommandBuilder()
  .setName("dev")
  .setDescription("Enable the settings of this Bot right in time!")
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("The channel to broadcast flutter roadmap")
      .addChannelTypes(ChannelType.GuildText)
      .setRequired(true)
  )
  .toJSON();

export default (action: ChatInputCommandInteraction, client?: Client) => {
  if (!action.guild) return;

  if (action.user.id !== process.env.AUTHORIZED_ID) {
    action.reply({ content: "Only bot author allowed to do this command!", ephemeral: true });
    return;
  }

  const channel = action.options.getChannel("channel");

  if (!channel) {
    action.reply({ content: "Please provide a valid channel!", ephemeral: true });
    return;
  }

  process.env.FLUTTER_CHANNEL_ID = channel.id;

  if (!client) return;

  flutter(client); // Re schedule job to corresponding channel.

  action.reply({ content: `Flutter channel has been set to ${channel}`, ephemeral: true });
};
