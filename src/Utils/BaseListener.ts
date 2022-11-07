import { Client, Message } from "discord.js";

export interface ListenerProps<T> {
  listen: boolean;
  data: T;
}

export default abstract class BaseListener<T> {
  abstract name: string;
  abstract listener: ListenerProps<T>;

  constructor() {
    this.handler = this.handler.bind(this);
  }

  abstract handler(paramaters: string[], client: Client, response: Message): void;

  abstract afterHook<T>(listen: boolean, data: T): void;
}
