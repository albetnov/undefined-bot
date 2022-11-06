import {
  ChatInputCommandInteraction,
  RESTPostAPIApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from "discord.js";

export default abstract class BaseCommand {
  abstract name: string;

  command() {
    return new SlashCommandBuilder().setName(this.name);
  }

  abstract handler(action: ChatInputCommandInteraction): void;
  abstract builder(): RESTPostAPIApplicationCommandsJSONBody;
}
