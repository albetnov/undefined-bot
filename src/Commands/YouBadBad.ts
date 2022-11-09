import { ChatInputCommandInteraction, EmbedBuilder, User } from "discord.js";
import BaseCommand from "../Utils/BaseCommand";
import axios from "axios";
import env from "../Utils/env";

export default class YouBadBad extends BaseCommand {
  name = "badbad";
  description = "You bad bad";
  BAD_USER = "bad_user";

  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }

  builder() {
    return this.command()
      .addUserOption((option) =>
        option.setName(this.BAD_USER).setDescription("Tag the bad user.").setRequired(true)
      )
      .toJSON();
  }

  private async giphy() {
    const res = await axios.get("https://api.giphy.com/v1/gifs/random", {
      params: {
        api_key: env("GIPHY_API_INTEGRATION"),
        tag: "anime slap",
      },
    });
    return res.data.data.images.original.url;
  }

  private async embed(user: User, sent: User) {
    return new EmbedBuilder()
      .setTitle("You bad bad")
      .setDescription(`${sent} say you bad bad ${user}, haiya...`)
      .setImage(await this.giphy())
      .setFooter({ text: "Dont be a bad guy again alright?" });
  }

  async handler(action: ChatInputCommandInteraction) {
    const user = action.options.getUser(this.BAD_USER);

    if (!user) {
      console.log("User invalid");
      return;
    }

    action.reply({ embeds: [await this.embed(user, action.user)] });
  }
}
