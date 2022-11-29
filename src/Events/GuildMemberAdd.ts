import { createCanvas, loadImage, Canvas } from "@napi-rs/canvas";
import {
  AttachmentBuilder,
  ChannelType,
  Client,
  EmbedBuilder,
  Events,
  GuildMember,
} from "discord.js";
import SettingsRepository from "../Repositories/SettingsRepository";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";
import env from "../Utils/env";
import { getCacheByKey } from "../Utils/GetCache";

export default class GuildMemberAdd extends BaseEvent<GuildMember> {
  type: string = Events.GuildMemberAdd;
  SERVER_NAME: string = env("SERVER_NAME");

  private embeds(member: GuildMember) {
    return (
      new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`Welcome ${member.displayName}!`)
        .setDescription(
          `Welcome to ${this.SERVER_NAME}. Please read the message I sent to you carefully!`
        )
        // .setImage("https://media.giphy.com/media/XD9o33QG9BoMis7iM4/giphy.gif")
        .setImage("attachment://image-profile.png")
        .setFooter({
          iconURL: "https://i.pinimg.com/564x/49/62/7e/49627e1d42add58548e4d6053c121dcf.jpg",
          text: `${this.SERVER_NAME} - Artisan Bot ${new Date().getFullYear()}.`,
        })
    );
  }

  private dmEmbed(client: Client) {
    const rules =
      client.channels.cache.get(getCacheByKey("channels", "RulesChannel")) ||
      "Rules Channel in Undefined Server.";

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

      Before step forwards though, I need you to get into ${rules} and proceed to agree. By that, you can
      then discover available channels.

      That's all folks. See you at the server.

    `
      )
      .setImage("https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif")
      .setFooter({
        iconURL: "https://i.pinimg.com/564x/49/62/7e/49627e1d42add58548e4d6053c121dcf.jpg",
        text: `Artisan Bot ${new Date().getFullYear()}`,
      });
  }

  applyText(canvas: Canvas, text: string) {
    const context = canvas.getContext("2d");
    let fontSize = 70;

    do {
      context.font = `${(fontSize -= 10)}px sans-serif`;
    } while (context.measureText(text).width > canvas.width - 300);

    return context.font;
  }

  async handler({ action, client }: ActionInterface<GuildMember>) {
    const result = await new SettingsRepository().find("enable_welcome");
    if (result.exists()) {
      if (result.data().value) {
        return;
      }
    }

    const channels = action.guild.channels.cache.get(getCacheByKey("channels", "WelcomeChannel"));
    if (!channels || channels.type !== ChannelType.GuildText) return;

    const withRules = await new SettingsRepository().find("enable_rules");

    if (withRules.exists()) {
      if (withRules.data().value) {
        action.roles.add(getCacheByKey("roles", "starting"));

        action.send({ embeds: [this.dmEmbed(client)] });
      }
    }

    const canvas = createCanvas(700, 250);
    const context = canvas.getContext("2d");

    const background = await loadImage("../../welcome.jpg");

    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.strokeStyle = "#0099ff";

    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.font = "28px sans-serif";
    context.fillStyle = "#ffffff";
    context.fillText("Profile", canvas.width / 2.5, canvas.height / 3.5);

    context.font = this.applyText(canvas, `${action.displayName}`);
    context.fillStyle = "#ffffff";
    context.fillText(`${action.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    const avatar = await loadImage(action.user.displayAvatarURL({ extension: "jpg" }));

    context.drawImage(avatar, 25, 200, 200, canvas.height);

    const attachment = new AttachmentBuilder(await canvas.encode("png"), {
      name: "image-profile.png",
    });

    channels.send({ embeds: [this.embeds(action)], files: [attachment] });
  }
}
