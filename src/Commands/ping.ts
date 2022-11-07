import { ChatInputCommandInteraction, CacheType } from "discord.js";
import BaseCommand from "../Utils/BaseCommand";

export default class Ping extends BaseCommand {
  name = "ping";
  description = "I will reply you with pong!";

  handler(action: ChatInputCommandInteraction<CacheType>): void {
    action.reply("Pong!");
  }
}
