import {ChatInputCommandInteraction, EmbedBuilder, User} from "discord.js";
import BaseCommand from "../Utils/BaseCommand";
import random from "../Utils/random";
import HolyServerRepository from "../Repositories/HolyServerRepository";

export default class Holy extends BaseCommand {
    name = "holy";
    description = "The command to help satisfy your \"Holy\" needs.";

    constructor() {
        super();
        this.handler = this.handler.bind(this);
    }

    embeds() {
        const data = new HolyServerRepository().getFromCache();
        const image = random(data);

        let quote = "May you be cured!";

        if (image === "https://i.pinimg.com/564x/4d/08/81/4d08816a4b0cf51ff82b67fa656bccca.jpg") {
            quote = "Hehe boi";
        }

        const description = `
		Be healed, my followers!
		------------------------
		${quote}
		`;

        return new EmbedBuilder()
            .setTitle("Holy Pictures For You!")
            .setImage(image)
            .setDescription(description);
    }

    handler(action: ChatInputCommandInteraction) {
        action.reply({embeds: [this.embeds()]});
    }
}