import { ButtonInteraction } from "discord.js";
import { AGREE_RULES } from "../../Listeners/CastRules";
import BaseButton from "../../Utils/BaseButton";
import AgreeModal from "../Modals/AgreeModal";

export default class AgreeRules extends BaseButton {
  customId = AGREE_RULES;

  handler(interaction: ButtonInteraction) {
    this.loadModal(interaction, AgreeModal);
  }
}
