import { ChatInputCommandInteraction, EmbedBuilder, MessageReaction, User } from "discord.js";
import { DocumentData } from "firebase/firestore";
import { logger } from "..";
import LoveRepository from "../Repositories/LoveRepository";
import BaseCommand from "../Utils/BaseCommand";

const BROKEN_HEART = "💔";
const HEART = "❤️";

export default class Love extends BaseCommand {
  name = "love";
  description = "Love a character!";

  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }

  async hasLoverHandler(
    action: ChatInputCommandInteraction,
    love: LoveRepository,
    user: DocumentData
  ) {
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
        await Promise.all([love.engage(action.user.id), love.divorce(user.id)]);
        message.reply("Parah kamu mas :cry:");
      }
      return;
    } catch {
      return message.reply("Saya anggap engga ya :smile:");
    }
  }

  embed(title: string, image: string, desc: string, icon: string, ownedId?: string) {
    return new EmbedBuilder()
      .setTitle(title)
      .setImage(image)
      .setDescription(desc)
      .setFooter({
        text: ownedId ? `${title} is in love with ${ownedId} already` : title,
        iconURL: icon,
      });
  }

  async handler(action: ChatInputCommandInteraction) {
    await action.deferReply();

    const love = new LoveRepository();
    const userId = action.user.id;
    let getUser = await love.getUser(userId);

    if (!getUser.exists()) {
      await love.engage(userId);
      getUser = await love.getUser(userId);
    }

    const user = getUser.data()!;

    if (user.hasLove) {
      return this.hasLoverHandler(action, love, user);
    }

    const randomItem = await love.getRandomItem();

    const message = await action.editReply({
      embeds: [
        this.embed(
          randomItem.fullName,
          randomItem.image,
          randomItem.desc,
          randomItem.icon,
          action.client.users.cache.get(randomItem.owned)?.username
        ),
      ],
      options: { fetchReply: true },
    });

    if (!randomItem.owned) {
      await message.react(HEART);

      const filter = (reaction: MessageReaction, user: User) => {
        return reaction.emoji.name === HEART && user.id !== action.client.user.id;
      };

      const collector = message.createReactionCollector({ filter, time: 30000, max: 1 });

      collector.on("collect", (reaction: MessageReaction, user: User) => {
        if (reaction.emoji.name !== HEART) {
          return;
        }

        love.engage(user.id, randomItem.id);
        if (user.id !== userId) {
          message.reply(
            `Nt terebut wkwkwk, :love:. ${randomItem.fullName} sekarang punya ${user.id}`
          );
        } else {
          message.reply(`Mantap, enjoy ur ${randomItem.fullName} :smile:`);
        }
      });
    }

    return;
  }
}
