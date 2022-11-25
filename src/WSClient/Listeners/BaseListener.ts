import { Client } from "discord.js";

export interface SocketListenerHandler {
  params: any[];
  client: Client;
}

export default abstract class BaseListener {
  abstract socket: string;

  abstract handler({ params, client }: SocketListenerHandler): void;
}
