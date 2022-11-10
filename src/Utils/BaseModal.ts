import { ModalBuilder, ModalSubmitInteraction } from "discord.js";

export default abstract class BaseModal {
  abstract customId: string;

  protected modal(builder: ModalBuilder) {
    return builder.setCustomId(this.customId);
  }

  abstract builder(builder: ModalBuilder): ModalBuilder;

  abstract handler(interaction: ModalSubmitInteraction): void;
}
