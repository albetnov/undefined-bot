import { ChatInputCommandInteraction, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";
import BaseCommand from "./BaseCommand";

export interface CommandSchema {
  handler: (action: ChatInputCommandInteraction) => void;
  schema: RESTPostAPIApplicationCommandsJSONBody;
  name: string;
}

/**
 * An object builder for new commands (Class Based)
 * To be then parsed by Kernel.
 */
export default function KernelClassRegisterer(commandClass: BaseCommand) {
  return {
    handler: commandClass.handler,
    schema: commandClass.builder(),
    name: commandClass.name,
  };
}
