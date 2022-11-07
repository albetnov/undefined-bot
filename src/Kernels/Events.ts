import InteractionCreate from "../Events/InteractionCreate";
import MessageCreate from "../Events/MessageCreate";
import Ready from "../Events/Ready";
import BaseEvent from "../Utils/BaseEvent";

// Warning: ORDER MATTERS!
const Events: BaseEvent<any>[] = [new Ready(), new InteractionCreate(), new MessageCreate()];

export default Events;
