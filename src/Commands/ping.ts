import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const pingSchema = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("I shall responded pong to you.")
  .toJSON();

export default (action: ChatInputCommandInteraction) => {
  action.reply("Pong!");
};
