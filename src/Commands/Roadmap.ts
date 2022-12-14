import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import BaseCommand from "../Utils/BaseCommand";
import { DocumentData } from "firebase/firestore";
import RoadmapRepository from "../Repositories/RoadmapRepository";

export default class Roadmap extends BaseCommand {
  name = "roadmap";
  description = "Shows roadmap path of specific programming language";
  LANGUAGE = "language";

  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }

  builder() {
    return this.command()
      .addStringOption((option) =>
        option
          .setName(this.LANGUAGE)
          .setDescription("Choose language to shown roadmap")
          .setRequired(true)
      )
      .toJSON();
  }

  private embed(data: DocumentData) {
    return new EmbedBuilder()
      .setColor("Blue")
      .setTitle(data.title)
      .setAuthor({
        name: data.author_name,
        url: data.author_url,
      })
      .setImage(data.image)
      .setDescription(data.content)
      .setFooter({ text: data.footer });
  }

  async handler(action: ChatInputCommandInteraction) {
    const language = action.options.getString(this.LANGUAGE);

    if (!language) {
      action.reply("Language Parameter not specified");
      return;
    }

    const roadmap = await new RoadmapRepository().find(language);

    if (!roadmap.exists()) {
      action.reply(`Ups, ${language} not exist.`);
      return;
    }

    action.reply({ embeds: [this.embed(roadmap.data())] });
  }
}
