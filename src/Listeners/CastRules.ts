import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  EmbedBuilder,
} from "discord.js";
import { DocumentData } from "firebase/firestore";
import { logger } from "..";
import RulesRepository from "../Repositories/RulesRepository";
import BaseListener, { HandlerProps } from "../Utils/BaseListener";
import env from "../Utils/env";
import { getCacheByKey } from "../Utils/GetCache";

export const AGREE_RULES = "agreeRules";
export const DISAGREE_RULES = "disagreeRules";

export class CastRules extends BaseListener {
  name = "CastRules";

  embeds(rules: DocumentData) {
    return new EmbedBuilder()
      .setColor("Yellow")
      .setAuthor({
        name: "Albet",
        iconURL: "https://i.pinimg.com/564x/28/d9/ee/28d9ee1cdf448e317885e43b0c498659.jpg",
        url: "https://github.com/albetnov",
      })
      .setDescription(
        `Hello and welcome to ${env("SERVER_NAME")}! Here's some rule you must follows:`
      )
      .addFields(...rules)
      .setImage("https://media.giphy.com/media/9JyTQrfpJs8zZ9xLI3/giphy.gif")
      .setFooter({
        text: "That's all. - Artisan",
      });
  }

  buttons() {
    return new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(AGREE_RULES)
          .setLabel("I agree (You can't disagree)")
          .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId(DISAGREE_RULES)
          .setLabel("Disagree (Actually you can)")
          .setStyle(ButtonStyle.Danger)
      );
  }

  async handler({ response }: HandlerProps) {
    const channels = response.guild?.channels.cache.get(getCacheByKey("channels", "RulesChannel"));
    if (!channels || channels.type !== ChannelType.GuildText) {
      logger.warn("incompitable channel");
      return;
    }

    const rules = await new RulesRepository().mapToKeyAndValue();

    channels.send({ embeds: [this.embeds(rules)], components: [this.buttons()] });

    response.channel.send("Rules Channel Set Up Successfully.");
  }
}
