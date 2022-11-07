import BaseEvent from "../Utils/BaseEvent";
import InteractionCreate from "./InteractionCreate";
import MessageCreate from "./messageCreate";
import Ready from "./Ready";

// WARNING: ARRAY ORDER MATTER!
const loader: BaseEvent<any>[] = [new Ready(), new InteractionCreate(), new MessageCreate()];

export default loader;
