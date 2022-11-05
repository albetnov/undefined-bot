import { ChannelType, SlashCommandBuilder } from "discord.js";

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

export default (action) => {
  if (!action.guild) return;

  const channel = action.options.getChannel("channel");

  if (action.user.id !== process.env.AUTHORIZED_ID) {
    action.reply({ content: "Only bot author allowed to do this command!", ephemeral: true });
    return;
  }

  process.env.FLUTTER_CHANNEL_ID = channel.id;

  action.reply({ content: `Flutter channel has been set to ${channel}`, ephemeral: true });
};
