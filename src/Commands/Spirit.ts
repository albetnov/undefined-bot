import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import BaseCommand from "../Utils/BaseCommand";
import { imgUrl, message } from "../Utils/spiritServer";

export default class Spirit extends BaseCommand {
  name = "spirit";

  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }

  random(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  embeds() {
    const image = this.random(imgUrl);

    let description = "Random Picture of me to help you gain spirit!";

    switch (image) {
      case "https://i.pinimg.com/564x/4d/1e/90/4d1e908fd00ac33ad02e20cfce13e370.jpg":
        description = "Kamu jomblo kan wkwkwkwk";
        break;
      case "https://i.pinimg.com/564x/4d/08/81/4d08816a4b0cf51ff82b67fa656bccca.jpg":
        description = "Ganteng Ga?";
        break;
      case "https://i.pinimg.com/564x/9e/03/da/9e03daca869b0378aa1decb0728f9c63.jpg":
        description = "Misi mas, mbak...";
        break;
    }

    return new EmbedBuilder()
      .setTitle(this.random(message))
      .setImage(image)
      .setDescription(description);
  }

  builder() {
    return this.command().setDescription("Built a spirit for you right away!").toJSON();
  }

  handler(action: ChatInputCommandInteraction) {
    action.reply({ embeds: [this.embeds()] });
  }
}
