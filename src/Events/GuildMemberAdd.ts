import { ChannelType, Client, EmbedBuilder, Events, GuildMember } from "discord.js";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";
import env from "../Utils/env";

export default class GuildMemberAdd extends BaseEvent<GuildMember> {
  type: string = Events.GuildMemberAdd;
  SERVER_NAME: string = env("SERVER_NAME");

  private embeds(member: GuildMember, client: Client) {
    return new EmbedBuilder()
      .setColor("Blue")
      .setTitle(`Welcome ${member.displayName}!`)
      .setDescription(
        `Welcome to ${this.SERVER_NAME}. Please read the message I sent to you carefully!`
      )
      .setImage(member.avatarURL() || "https://media.giphy.com/media/XD9o33QG9BoMis7iM4/giphy.gif")
      .setFooter({
        iconURL:
          client.user?.avatarURL() ||
          "https://i.pinimg.com/564x/49/62/7e/49627e1d42add58548e4d6053c121dcf.jpg",
        text: `${this.SERVER_NAME} - Artisan Bot ${new Date().getFullYear()}.`,
      });
  }

  private dmEmbed(client: Client) {
    const rules =
      client.channels.cache.get(env("RULES_CHANNEL_ID")) || "Rules Channel in Undefined Server.";

    return new EmbedBuilder()
      .setColor("Blue")
      .setTitle(`Welcome to ${this.SERVER_NAME}!`)
      .setDescription(
        `

      Hi, Nice to meet you! Let me introduce my self.
      I am Artisan. A Assitance to help you develop your Software's Artisans.

      Welcome to ${this.SERVER_NAME}!
      As you might already aware. ${env(
        "SERVER_NAME"
      )} is a server for Software Artisan and wannabe.
      In this server, you will either guide or be guided to learn more about Software Development.

      Before step forwards though, I need you to get into ${rules}.

      That's all folks. See you at the server.

    `
      )
      .setImage("https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif")
      .setFooter({
        iconURL:
          client.user?.avatarURL() ||
          "https://i.pinimg.com/564x/49/62/7e/49627e1d42add58548e4d6053c121dcf.jpg",
        text: `Artisan Bot ${new Date().getFullYear()}`,
      });
  }

  handler({ action, client }: ActionInterface<GuildMember>) {
    const channels = action.guild.channels.cache.get(env("WELCOME_CHANNEL_ID"));
    if (!channels || channels.type !== ChannelType.GuildText) return;

    action.roles.add(env("STARTING_ROLE"));

    action.send({ embeds: [this.dmEmbed(client)] });

    channels.send({ embeds: [this.embeds(action, client)] });
  }
}
