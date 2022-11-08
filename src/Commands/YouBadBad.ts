import { ChatInputCommandInteraction, EmbedBuilder, User } from "discord.js";
import BaseCommand from "../Utils/BaseCommand";
import random from "../Utils/random";
import YouBadBadImgUrl from "../Utils/youBadBadServer";

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

  private embed(user: User, sent: User) {
    return new EmbedBuilder()
      .setTitle("You bad bad")
      .setDescription(`${sent} say you bad bad ${user}, haiya...`)
      .setImage(random(YouBadBadImgUrl))
      .setFooter({ text: "Dont be a bad guy again alright?" });
  }

  handler(action: ChatInputCommandInteraction) {
    const user = action.options.getUser(this.BAD_USER);

    if (!user) {
      console.log("User invalid");
      return;
    }

    action.reply({ embeds: [this.embed(user, action.user)] });
  }
}
