import {
  AttachmentBuilder,
  CacheType,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";
import BaseCommand from "../Utils/BaseCommand";

export default class About extends BaseCommand {
  name = "about";
  description = "What is me?";

  handler(action: ChatInputCommandInteraction<CacheType>): void {
    const gambarAyang = new AttachmentBuilder("./assets/ayang.jpeg");

    const ayang = new EmbedBuilder()
      .setTitle("🤍")
      .setImage("attachment://ayang.jpeg")
      .setDescription(
        `
        Artisan: A Assistant for Artisans
        v0.1 (State: Development)

        I will help you keep track of your roadmap. 
        Ensure you will become
        the developer you want to be.
        
        Built on top of Discord.JS with NodeJS.
        Written by: AlbetNov
        `
      );

    action.reply({
      embeds: [ayang],
      files: [gambarAyang],
    });
  }
}
