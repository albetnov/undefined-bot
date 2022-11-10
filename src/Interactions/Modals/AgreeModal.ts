import {
  ActionRowBuilder,
  CacheType,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import BaseModal from "../../Utils/BaseModal";
import env from "../../Utils/env";

export default class AgreeModal extends BaseModal {
  customId = "setNickNameModal";
  nickNameInput = "nickNameInput";

  builder(builder: ModalBuilder) {
    const modal = this.modal(builder).setTitle("Fill with your real name.");

    const nickNameInput = new TextInputBuilder()
      .setCustomId(this.nickNameInput)
      .setLabel("Your real name")
      .setStyle(TextInputStyle.Short)
      .setMaxLength(20)
      .setMinLength(3);

    const nickNameRow = new ActionRowBuilder<TextInputBuilder>().addComponents(nickNameInput);

    modal.addComponents(nickNameRow);

    return modal;
  }

  handler(interaction: ModalSubmitInteraction<CacheType>): void {
    if (interaction.memberPermissions?.has("Administrator")) {
      interaction.reply({ content: `KAMU ADMIN BGST ${interaction.user}`, ephemeral: true });
      return;
    }
    interaction.guild?.members.removeRole({
      role: env("STARTING_ROLE"),
      user: interaction.user.id,
    });
    interaction.guild?.members.addRole({
      role: env("USER_ROLE"),
      user: interaction.user.id,
    });
    interaction.guild?.members.cache
      .get(interaction.user.id)
      ?.setNickname(interaction.fields.getTextInputValue(this.nickNameInput));
    interaction.reply({ content: `Thanks for agreeing ${interaction.user}.`, ephemeral: true });
  }
}
