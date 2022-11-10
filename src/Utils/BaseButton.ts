import { ButtonInteraction, ModalBuilder } from "discord.js";
import BaseModal from "./BaseModal";

export default abstract class BaseButton {
  abstract customId: string;

  abstract handler(interaction: ButtonInteraction): void;

  protected loadModal(interaction: ButtonInteraction, modal: new () => BaseModal) {
    return interaction.showModal(new modal().builder(new ModalBuilder()));
  }
}
