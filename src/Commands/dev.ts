import dayjs from "dayjs";
import { ChatInputCommandInteraction, CacheType } from "discord.js";
import { scheduleJob } from "node-schedule";
import BaseCommand from "../Utils/BaseCommand";
import { afterHook, ListenerProps } from "../Utils/BaseListener";
import env from "../Utils/env";

export default class Dev extends BaseCommand {
  name = "dev";
  description = "Changes bot configuration right away using interactive chat mode!";

  handler(action: ChatInputCommandInteraction<CacheType>): void {
    if (!action.guild) return;

    if (action.user.id !== env("AUTHORIZED_ID")) {
      action.reply({ content: "Only bot author allowed to do this command!", ephemeral: true });
      return;
    }

    afterHook(true, action.user.id);

    action.reply(
      "DevTools: Interactive Mode Enabled. I will listening to message with prefix 'Artisan:'. Exit anytime with 'Artisan:Exit'"
    );

    scheduleJob(dayjs().add(50, "minutes").toDate(), () => {
      ListenerProps.listen = false;
      action.followUp(
        "Timeout of 50 minutes met. Please recall `/dev` command if you want extends."
      );
    });
  }
}
