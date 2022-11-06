import { ChatInputCommandInteraction } from "discord.js";
import BaseCommand from "../Utils/BaseCommand";
import Kernel, { loadKernel } from "./Roadmap/Kernel";

export default class Roadmap extends BaseCommand {
  name = "roadmap";
  LANGUAGE = "language";

  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }

  builder() {
    return this.command()
      .setDescription("Shows roadmap path of specific programming language")
      .addStringOption((option) =>
        option
          .setName(this.LANGUAGE)
          .setDescription("Choose language to shown roadmap")
          .setRequired(true)
          .addChoices(...Kernel.map((item) => ({ name: item.name, value: item.name })))
      )
      .toJSON();
  }

  handler(action: ChatInputCommandInteraction): void {
    const lang = action.options.getString(this.LANGUAGE);

    loadKernel(lang, action);
  }
}
