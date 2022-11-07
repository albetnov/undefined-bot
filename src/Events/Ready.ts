import { Client, Events } from "discord.js";
import Boot from "../Kernels/Boot";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";

export default class Ready extends BaseEvent<Client> {
  type: string = Events.ClientReady;

  handler({ client }: ActionInterface<Client>) {
    console.log("Artisan is painting... 🖌️");

    Boot.forEach((item) => {
      item(client);
    });
  }
}
