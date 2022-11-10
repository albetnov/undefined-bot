import { ChannelType, ChatInputCommandInteraction, Message } from "discord.js";
import { setTimeout } from "timers/promises";
import BaseCommand from "../Utils/BaseCommand";

export default class ClearMessage extends BaseCommand {
  name = "clear";
  description = "Clear a message in current channel";

  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }

  async handler(action: ChatInputCommandInteraction) {
    if (!action.memberPermissions?.has("Administrator")) {
      action.reply({ content: "Only admin can do this!", ephemeral: true });
    }

    const user = action.user.id;

    action.reply({
      content: "Are you sure you want to clear this channel message?",
      ephemeral: true,
    });

    const filter = (collect: Message) => {
      if (collect.member === null || collect.member.id !== user) return false;
      return collect.content.toLowerCase() === "yes" || collect.content.toLowerCase() === "no";
    };

    const collector = action.channel?.createMessageCollector({
      filter,
      max: 1,
      time: 30000,
    });

    collector?.on("collect", async (collected) => {
      const clear = collected.content === "yes" ? true : false;
      if (clear) {
        if (action.channel?.type !== ChannelType.GuildText) {
          collected.reply({
            content: "Incompitable channel type: Channel Must Text Based.",
            options: { ephemeral: true },
          });
          return;
        }

        collected.reply({ content: "Clearing Channel", options: { ephemeral: true } });

        await setTimeout(1000);

        let fetched;

        do {
          fetched = await action.channel?.messages.fetch({ limit: 100 });
          action.channel.bulkDelete(fetched);
        } while (fetched.size >= 2);
        return;
      }

      action.followUp({ content: "You said no: Aborting.", ephemeral: true });
    });

    collector?.on("end", (collected) => {
      if (collected.size === 0) {
        action.followUp({ content: "No Input: Aborting.", ephemeral: true });
        return;
      }
    });
  }
}
