import { Client, Events } from "discord.js";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";
import BootKernel from "../Boot/Kernel";

export default class Ready extends BaseEvent<Client> {
  type: string = Events.ClientReady;

  handler({ client }: ActionInterface<Client>) {
    console.log("Artisan is painting... 🖌️");

    BootKernel.forEach((item) => {
      item(client);
    });
  }
}
