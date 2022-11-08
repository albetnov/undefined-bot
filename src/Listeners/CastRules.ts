import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  EmbedBuilder,
} from "discord.js";
import BaseListener, { HandlerProps } from "../Utils/BaseListener";
import env from "../Utils/env";

export const AGREE_RULES = "agreeRules";
export const DISAGREE_RULES = "disagreeRules";

export class CastRules extends BaseListener {
  name = "CastRules";

  private embeds() {
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
      .addFields(
        { name: "No rude words.", value: "Dilarang bicara kasar yak." },
        { name: "Respect each other", value: "Hormat sesama ygy" },
        { name: "Fuck Seniority", value: "Jan belagu" },
        {
          name: "Agree to this rule and proceed setting nickname to real name",
          value:
            "Pake nama asli dong. Masa behind the text mulu :V (Let artisan bikin nickname kalian)",
        },
        { name: "Fuck to conflicts", value: "U conflict? U will not longer see this server." }
      )
      .setImage("https://media.giphy.com/media/9JyTQrfpJs8zZ9xLI3/giphy.gif")
      .setFooter({
        text: "That's all. - Artisan",
      });
  }

  private buttons() {
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

  handler({ response }: HandlerProps) {
    const channels = response.guild?.channels.cache.get(env("RULES_CHANNEL_ID"));
    if (!channels || channels.type !== ChannelType.GuildText) {
      console.log("incompitable channel");
      return;
    }

    channels.send({ embeds: [this.embeds()], components: [this.buttons()] });

    response.channel.send("Rules Channel Set Up Successfully.");
  }
}
