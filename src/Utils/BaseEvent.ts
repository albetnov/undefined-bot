import { Client } from "discord.js";

export interface ActionInterface<T> {
  action: T;
  client: Client;
}

export default abstract class BaseEvent<T> {
  abstract type: string;

  abstract handler(action: ActionInterface<T>): void;
}
