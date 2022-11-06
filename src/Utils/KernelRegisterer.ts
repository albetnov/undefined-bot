import { ChatInputCommandInteraction, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";

type HandlerSchema = (action: ChatInputCommandInteraction) => void;

/**
 * An object builder for old commands (Files)
 * To be then parsed by Kernel.
 */
export default class KernelRegisterer {
  private name: string;
  private schema: RESTPostAPIApplicationCommandsJSONBody | null = null;

  constructor(name: string) {
    this.name = name;
  }

  applySchema(schema: RESTPostAPIApplicationCommandsJSONBody) {
    this.schema = schema;
    return this;
  }

  register(handler: HandlerSchema) {
    return {
      name: this.name,
      handler,
      schema: this.schema,
    };
  }
}
