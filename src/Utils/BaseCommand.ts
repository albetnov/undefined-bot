import {
  ChatInputCommandInteraction,
  RESTPostAPIApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from "discord.js";

export default abstract class BaseCommand {
  abstract name: string;
  abstract description: string;

  protected command() {
    return new SlashCommandBuilder().setName(this.name).setDescription(this.description);
  }

  abstract handler(action: ChatInputCommandInteraction): void;
  builder(): RESTPostAPIApplicationCommandsJSONBody {
    return this.command().toJSON();
  }
}
