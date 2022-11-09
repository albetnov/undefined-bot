import {
  ActionRowBuilder,
  Events,
  Interaction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";
import Commands from "../Kernels/Commands";
import { AGREE_RULES, DISAGREE_RULES } from "../Listeners/CastRules";
import env from "../Utils/env";

const SET_NICKNAME_MODAL = "setNickNameModal";
const NICKNAME_INPUT = "nickNameInput";

export default class InteractionCreate extends BaseEvent<Interaction> {
  type: string = Events.InteractionCreate;

  private modal() {
    const modalWindow = new ModalBuilder()
      .setCustomId(SET_NICKNAME_MODAL)
      .setTitle("Fill the form or be doomed.");

    const nickNameInput = new TextInputBuilder()
      .setCustomId(NICKNAME_INPUT)
      .setLabel("What is your real name?")
      .setStyle(TextInputStyle.Short);

    const nickNameRow = new ActionRowBuilder<TextInputBuilder>().addComponents(nickNameInput);

    modalWindow.addComponents(nickNameRow);

    return modalWindow;
  }

  handler({ action: iteraction }: ActionInterface<Interaction>) {
    if (iteraction.isButton()) {
      if (iteraction.customId === AGREE_RULES) {
        iteraction.showModal(this.modal());
      }

      if (iteraction.customId === DISAGREE_RULES) {
        if (iteraction.memberPermissions?.has("Administrator")) {
          iteraction.reply({ content: `KAMU ADMIN BGST ${iteraction.user}`, ephemeral: true });
          return;
        }
        iteraction.guild?.members.kick(iteraction.user.id, "For not accepting rules.");
      }
    }

    if (iteraction.isModalSubmit()) {
      if (iteraction.customId === SET_NICKNAME_MODAL) {
        if (iteraction.memberPermissions?.has("Administrator")) {
          iteraction.reply({ content: `KAMU ADMIN BGST ${iteraction.user}`, ephemeral: true });
          return;
        }
        iteraction.guild?.members.removeRole({
          role: env("STARTING_ROLE"),
          user: iteraction.user.id,
        });
        iteraction.guild?.members.addRole({
          role: env("USER_ROLE"),
          user: iteraction.user.id,
        });
        iteraction.guild?.members.cache
          .get(iteraction.user.id)
          ?.setNickname(iteraction.fields.getTextInputValue(NICKNAME_INPUT));
        iteraction.reply({ content: `Thanks for agreeing ${iteraction.user}.`, ephemeral: true });
      }
    }

    if (!iteraction.isChatInputCommand()) return;

    Commands.forEach((item) => {
      if (iteraction.commandName === item.name) {
        item.handler(iteraction);
      }
    });
  }
}
