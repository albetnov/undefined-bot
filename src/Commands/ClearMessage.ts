import { ChannelType, ChatInputCommandInteraction } from "discord.js";
import BaseCommand from "../Utils/BaseCommand";

export default class ClearMessage extends BaseCommand {
  name = "clear";
  description = "Clear a message in current channel";

  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }

  async handler(action: ChatInputCommandInteraction) {
    if (action.channel?.type !== ChannelType.GuildText) return;
    let fetched;
    do {
      fetched = await action.channel?.messages.fetch({ limit: 100 });
      action.channel.bulkDelete(fetched);
    } while (fetched.size >= 2);
    action.reply("Channel cleared successfully.");
  }
}
