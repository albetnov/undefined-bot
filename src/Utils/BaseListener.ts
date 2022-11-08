import { Client } from "discord.js";

export const ListenerProps = {
  listen: false,
  user: "",
};

export const afterHook = (listen: boolean, user: string) => {
  ListenerProps.listen = listen;
  ListenerProps.user = user;
};

export interface HandlerProps<T> {
  parameters: string[];
  client: Client;
  response: T;
}

export default abstract class BaseListener<T> {
  abstract name: string;

  constructor() {
    this.handler = this.handler.bind(this);
  }

  abstract handler(handler: HandlerProps<T>): void;
}
