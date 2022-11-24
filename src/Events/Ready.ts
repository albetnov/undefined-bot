import { Client, Events } from "discord.js";
import { logger } from "..";
import Boot from "../Kernels/Boot";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";
import RealtimeRepo from "../Kernels/RealtimeRepo";
import WebhookHttp from "../Webhook/WebhookHttp";
import env from "../Utils/env";
import WebsocketClient from "../WSClient/WebsocketClient";

export default class Ready extends BaseEvent<Client> {
  type: string = Events.ClientReady;

  handler({ client }: ActionInterface<Client>) {
    logger.info("Artisan is painting...");

    Boot.forEach((item) => {
      item(client);
    });

    RealtimeRepo.forEach((item) => {
      item.listen(client);
    });

    // Start Webhook.
    if (env("ENABLE_WEBHOOK", "false") === "true") {
      new WebhookHttp().handler(client);
    }

    if (env("ENABLE_WEBSOCKET", "false") === "true") {
      new WebsocketClient().handler(client);
    }
  }
}
