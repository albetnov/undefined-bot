import { Events, Interaction } from "discord.js";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";
import { kernel } from "../Kernel";

export default class InteractionCreate extends BaseEvent<Interaction> {
  type: string = Events.InteractionCreate;

  handler({ action: iteraction }: ActionInterface<Interaction>) {
    if (!iteraction.isChatInputCommand()) return;

    kernel.forEach((item) => {
      if (iteraction.commandName === item.name) {
        item.handler(iteraction);
      }
    });
  }
}
