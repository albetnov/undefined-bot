import { Events, Interaction } from "discord.js";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";
import Commands from "../Kernels/Commands";
import { buttons, modals } from "../Kernels/Interactions";

export default class InteractionCreate extends BaseEvent<Interaction> {
  type: string = Events.InteractionCreate;

  handler({ action: interaction }: ActionInterface<Interaction>) {
    if (interaction.isButton()) {
      buttons.forEach((item) => {
        if (interaction.customId === item.customId) {
          item.handler(interaction);
        }
      });
    }

    if (interaction.isModalSubmit()) {
      modals.forEach((item) => {
        if (interaction.customId === item.customId) {
          item.handler(interaction);
        }
      });
    }

    if (!interaction.isChatInputCommand()) return;

    Commands.forEach((item) => {
      if (interaction.commandName === item.name) {
        item.handler(interaction);
      }
    });
  }
}
