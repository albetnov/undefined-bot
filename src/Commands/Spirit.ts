import { ChatInputCommandInteraction, EmbedBuilder, User } from "discord.js";
import BaseCommand from "../Utils/BaseCommand";
import { imgUrl, message } from "../Utils/spiritServer";

export default class Spirit extends BaseCommand {
  name = "spirit";
  description = "Built a spirit for you right away!";

  USER = "user";

  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }

  random(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  embeds(user: User | null) {
    const image = this.random(imgUrl);

    let quote = "Random Picture of me to help you gain spirit!";

    switch (image) {
      case "https://i.pinimg.com/564x/4d/1e/90/4d1e908fd00ac33ad02e20cfce13e370.jpg":
        quote = "Kamu jomblo kan wkwkwkwk";
        break;
      case "https://i.pinimg.com/564x/4d/08/81/4d08816a4b0cf51ff82b67fa656bccca.jpg":
        quote = "Ganteng Ga?";
        break;
      case "https://i.pinimg.com/564x/9e/03/da/9e03daca869b0378aa1decb0728f9c63.jpg":
        quote = "Misi mas, mbak...";
        break;
    }

    const description = `
    GO GO GO, ${user}!
    ---------------------
    ${quote}
    `;

    return new EmbedBuilder()
      .setTitle(this.random(message))
      .setImage(image)
      .setDescription(user ? description : quote);
  }

  builder() {
    return this.command()
      .addUserOption((option) =>
        option
          .setName(this.USER)
          .setDescription("User to given spirit? If filled, Artisan will tag the user.")
      )
      .toJSON();
  }

  handler(action: ChatInputCommandInteraction) {
    const user = action.options.getUser(this.USER);

    action.reply({ embeds: [this.embeds(user)] });
  }
}
