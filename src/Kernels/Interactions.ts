import AgreeRules from "../Interactions/Buttons/AgreeRules";
import DisagreeRules from "../Interactions/Buttons/DisagreeRules";
import AgreeModal from "../Interactions/Modals/AgreeModal";
import BaseButton from "../Utils/BaseButton";
import BaseModal from "../Utils/BaseModal";

export const buttons: BaseButton[] = [new AgreeRules(), new DisagreeRules()];

export const modals: BaseModal[] = [new AgreeModal()];
