import { ChatInputCommandInteraction } from "discord.js";

type RoadmapHandlerSchema = (action: ChatInputCommandInteraction) => void;

export default class RoadmapLoader {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  register(handler: RoadmapHandlerSchema) {
    return {
      name: this.name,
      handler,
    };
  }
}
