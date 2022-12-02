import { createCanvas, loadImage, Canvas } from "@napi-rs/canvas";
import {
  AttachmentBuilder,
  ChannelType,
  Client,
  EmbedBuilder,
  Events,
  GuildMember,
} from "discord.js";
import { DocumentData } from "firebase/firestore";
import { readFileSync } from "fs";
import SettingsRepository from "../Repositories/SettingsRepository";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";
import env from "../Utils/env";
import { getCacheByKey } from "../Utils/GetCache";
import parseSpecialChar from "../Utils/ParseSpecialChar";

export default class GuildMemberAdd extends BaseEvent<GuildMember> {
  type: string = Events.GuildMemberAdd;
  SERVER_NAME: string = env("SERVER_NAME");

  private embeds(member: GuildMember, props: DocumentData) {
    return new EmbedBuilder()
      .setColor("Blue")
      .setTitle(parseSpecialChar(props.welcomeTitle, member))
      .setDescription(parseSpecialChar(props.welcomeDesc, member))
      .setImage("attachment://image-profile.png")
      .setFooter({
        iconURL: "https://i.pinimg.com/564x/49/62/7e/49627e1d42add58548e4d6053c121dcf.jpg",
        text: `${this.SERVER_NAME} - Artisan Bot ${new Date().getFullYear()}.`,
      });
  }

  private dmEmbed(client: Client, props: DocumentData) {
    const rules =
      client.channels.cache.get(getCacheByKey("channels", "RulesChannel")) ||
      "Rules Channel in Undefined Server.";

    return new EmbedBuilder()
      .setColor("Blue")
      .setTitle(parseSpecialChar(props.dmTitle))
      .setDescription(parseSpecialChar(props.dmDesc).replace(/\[RULES\]/, rules.toString()))
      .setImage(parseSpecialChar(props.dmImg))
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
    if (!result.exists()) return;

    const welcomeProps = result.data();

    if (!welcomeProps.value) {
      return;
    }

    const channels = action.guild.channels.cache.get(getCacheByKey("channels", "WelcomeChannel"));
    if (!channels || channels.type !== ChannelType.GuildText) return;

    const withRules = await new SettingsRepository().find("enable_rules");

    if (withRules.exists()) {
      const result = withRules.data();
      if (result.value) {
        action.roles.add(getCacheByKey("roles", "starting"));

        action.send({ embeds: [this.dmEmbed(client, result)] });
      }
    }

    const canvas = createCanvas(700, 250);
    const context = canvas.getContext("2d");

    const background = await loadImage(readFileSync(__dirname + "/../../assets/welcome.jpg"));

    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.strokeStyle = "#0099ff";

    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.font = "28px sans-serif";
    context.fillStyle = "#ffffff";
    context.fillText("Welcomeeeee!!!", canvas.width / 2.5, canvas.height / 3.5);

    context.font = this.applyText(canvas, `${action.displayName}`);
    context.fillStyle = "#ffffff";
    context.fillText(`${action.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    const avatar = await loadImage(action.user.displayAvatarURL({ extension: "jpg" }));

    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    context.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new AttachmentBuilder(await canvas.encode("png"), {
      name: "image-profile.png",
    });

    channels.send({ embeds: [this.embeds(action, welcomeProps)], files: [attachment] });
  }
}
