import GuildMemberAdd from "../Events/GuildMemberAdd";
import GuildMemberRemove from "../Events/GuildMemberRemove";
import InteractionCreate from "../Events/InteractionCreate";
import MessageCreate from "../Events/MessageCreate";
import Ready from "../Events/Ready";
import BaseEvent from "../Utils/BaseEvent";

// Warning: ORDER MATTERS!
const Events: BaseEvent<any>[] = [
  new Ready(),
  new InteractionCreate(),
  new MessageCreate(),
  new GuildMemberAdd(),
  new GuildMemberRemove(),
];

export default Events;
