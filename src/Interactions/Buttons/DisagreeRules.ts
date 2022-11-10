import { ButtonInteraction } from "discord.js";
import { DISAGREE_RULES } from "../../Listeners/CastRules";
import BaseButton from "../../Utils/BaseButton";

export default class DisagreeRules extends BaseButton {
  customId = DISAGREE_RULES;

  handler(interaction: ButtonInteraction) {
    if (interaction.memberPermissions?.has("Administrator")) {
      interaction.reply({ content: `KAMU ADMIN BGST ${interaction.user}`, ephemeral: true });
      return;
    }
    interaction.guild?.members.kick(interaction.user.id, "For not accepting rules.");
  }
}
