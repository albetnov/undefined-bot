import { ChatInputCommandInteraction, CacheType } from "discord.js";
import BaseCommand from "../Utils/BaseCommand";
import { afterHook } from "../Utils/BaseListener";
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
  }
}
