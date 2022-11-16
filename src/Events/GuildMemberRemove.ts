import { ChannelType, Client, EmbedBuilder, Events, GuildMember } from "discord.js";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";
import env from "../Utils/env";
import { getCacheByKey } from "../Utils/GetCache";

export default class GuildMemberRemove extends BaseEvent<GuildMember> {
  type: string = Events.GuildMemberRemove;
  SERVER_NAME: string = env("SERVER_NAME");

  private embeds(member: GuildMember, client: Client) {
    return new EmbedBuilder()
      .setColor("Red")
      .setTitle(`Farewell, ${member.displayName}!`)
      .setDescription(`Thanks for being in ${this.SERVER_NAME}.`)
      .setImage(member.avatarURL() || "https://media.giphy.com/media/3o8doR2qGIXQDGCVoY/giphy.gif")
      .setFooter({
        iconURL:
          client.user?.avatarURL() ||
          "https://i.pinimg.com/564x/49/62/7e/49627e1d42add58548e4d6053c121dcf.jpg",
        text: `${this.SERVER_NAME} - Artisan Bot ${new Date().getFullYear()}.`,
      });
  }

  handler({ action, client }: ActionInterface<GuildMember>) {
    const channels = action.guild.channels.cache.get(getCacheByKey("channels", "ByeChannel"));
    if (!channels || channels.type !== ChannelType.GuildText) return;

    channels.send({ embeds: [this.embeds(action, client)] });
  }
}
