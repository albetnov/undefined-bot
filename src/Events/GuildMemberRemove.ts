import { ChannelType, EmbedBuilder, Events, GuildMember } from "discord.js";
import { DocumentData } from "firebase/firestore";
import { logger } from "..";
import SettingsRepository from "../Repositories/SettingsRepository";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";
import env from "../Utils/env";
import { getCacheByKey } from "../Utils/GetCache";
import parseSpecialChar from "../Utils/ParseSpecialChar";

export default class GuildMemberRemove extends BaseEvent<GuildMember> {
  type: string = Events.GuildMemberRemove;
  SERVER_NAME: string = env("SERVER_NAME");

  private embeds(member: GuildMember, props: DocumentData) {
    return new EmbedBuilder()
      .setColor("Red")
      .setTitle(parseSpecialChar(props.byeTitle, member))
      .setDescription(parseSpecialChar(props.byeDesc))
      .setImage(props.byeImg)
      .setFooter({
        iconURL: "https://i.pinimg.com/564x/49/62/7e/49627e1d42add58548e4d6053c121dcf.jpg",
        text: `${this.SERVER_NAME} - Artisan Bot ${new Date().getFullYear()}.`,
      });
  }

  async handler({ action }: ActionInterface<GuildMember>) {
    const result = await new SettingsRepository().find("enable_bye");
    if (!result.exists()) {
      logger.warn("Appropriate table named settings with key: enable_bye not exist.");
      logger.warn("Please recheck them. Canceling this handler");
      return;
    }

    const data = result.data();

    if (!data.value) {
      return;
    }

    const channels = action.guild.channels.cache.get(getCacheByKey("channels", "ByeChannel"));
    if (!channels || channels.type !== ChannelType.GuildText) return;

    channels.send({ embeds: [this.embeds(action, data)] });
  }
}
