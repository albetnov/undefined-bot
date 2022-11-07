import { Events, Interaction } from "discord.js";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";
import Commands from "../Kernels/Commands";

export default class InteractionCreate extends BaseEvent<Interaction> {
  type: string = Events.InteractionCreate;

  handler({ action: iteraction }: ActionInterface<Interaction>) {
    if (!iteraction.isChatInputCommand()) return;

    Commands.forEach((item) => {
      if (iteraction.commandName === item.name) {
        item.handler(iteraction);
      }
    });
  }
}