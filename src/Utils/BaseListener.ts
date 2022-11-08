import { Client, Message } from "discord.js";

export const ListenerProps = {
  listen: false,
  user: "",
};

export const afterHook = (listen: boolean, user: string) => {
  ListenerProps.listen = listen;
  ListenerProps.user = user;
};

export interface HandlerProps {
  parameters: string[];
  client: Client;
  response: Message;
}

export default abstract class BaseListener {
  abstract name: string;

  constructor() {
    this.handler = this.handler.bind(this);
  }

  abstract handler(handler: HandlerProps): void;
}
