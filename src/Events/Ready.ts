import { Client, Events } from "discord.js";
import { logger } from "..";
import Boot from "../Kernels/Boot";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";

export default class Ready extends BaseEvent<Client> {
  type: string = Events.ClientReady;

  handler({ client }: ActionInterface<Client>) {
    logger.info("Artisan is painting...");

    Boot.forEach((item) => {
      item(client);
    });
  }
}
