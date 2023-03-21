import { ChatInputCommandInteraction, EmbedBuilder, MessageReaction, User } from "discord.js";
import { logger } from "..";
import LoveRepository from "../Repositories/LoveRepository";
import BaseCommand from "../Utils/BaseCommand";

const BROKEN_HEART = "💔";

export default class Love extends BaseCommand {
  name = "love";
  description = "Love a character!";

  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }

  async hasLoverHandler(action: ChatInputCommandInteraction, love: LoveRepository) {
    const message = await action.editReply({
      content: "Ente udah ada bang, mau ganti kah?",
      options: {
        fetchReply: true,
      },
    });

    await message.react(BROKEN_HEART);

    logger.info(message.author.id);

    const filter = (reaction: MessageReaction, user: User) => {
      return reaction.emoji.name === BROKEN_HEART && user.id === action.user.id;
    };

    try {
      const collected = await message.awaitReactions({
        filter,
        max: 1,
        time: 30000,
        errors: ["time"],
      });
      const emoji = collected.first()?.emoji.name;

      if (emoji === BROKEN_HEART) {
        await love.save(action.user.id);
        message.reply("Parah kamu mas :cry:");
      }
      return;
    } catch {
      return message.reply("Saya anggap engga ya :smile:");
    }
  }

  embed() {
    return new EmbedBuilder()
      .setTitle("Kujou, Alisa Mikhailovna")
      .setImage("https://cdn.myanimelist.net/images/anime/1922/134324.jpg")
      .setDescription(
        `Smart, refined, and strikingly gorgeous, half-Russian half-Japanese Alisa Mikhailovna Kujou 
        is considered the idol of her school. With her long silver hair, mesmerizing blue eyes, and 
        exceptionally fair skin, she has captured the hearts of countless male students while being 
        highly admired by all others. Even so, due to her seemingly unapproachable persona, everyone 
        remains wary around the near-flawless girl.`
      )
      .setFooter({
        text: "Kujou, Alisa Mikhailovna",
        iconURL:
          "https://cdn.myanimelist.net/r/42x62/images/characters/4/492823.webp?s=aef4091a20dceea6a7a926b6aa274c48",
      });
  }

  async handler(action: ChatInputCommandInteraction) {
    await action.deferReply();

    const love = new LoveRepository();
    const userId = action.user.id;
    let getUser = await love.getUser(userId);

    if (!getUser.exists()) {
      await love.save(userId);
      getUser = await love.getUser(userId);
    }

    const user = getUser.data()!;

    if (user.hasLove) {
      return this.hasLoverHandler(action, love);
    }

    return action.editReply({ embeds: [this.embed()] });
  }
}
