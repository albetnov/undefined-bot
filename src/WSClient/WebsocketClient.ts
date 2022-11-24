import { Client } from "discord.js";
import { logger } from "..";
import { io } from "socket.io-client";
import env from "../Utils/env";

export default class WebsocketClient {
  url = "";

  constructor() {
    if (env("APP_ENV", "development") === "production") {
      this.url = env("WEBHOOK_URL_LIVE");
    } else {
      this.url = env("WEBSOCKET_URL", "http://localhost:3001");
    }
  }

  handler(client: Client) {
    logger.info(`Listening to Websocket at ${this.url}`);
    const socket = io(this.url);

    socket.on("connect", () => {
      const engine = socket.io.engine;

      engine.once("upgrade", () => {
        logger.info("Socket Upgraded: " + engine.transport.name);
      });

      logger.info(`Connected: ${socket.id}`);
    });

    socket.on("refreshCache", (data) => {
      console.log(data);
    });

    socket.on("disconnect", () => {
      logger.warn("Socket disconnected.");
    });

    socket.io.on("reconnect_attempt", () => {
      logger.info("Reconnecting...");
    });

    socket.io.on("reconnect", () => {
      logger.warn("Attempt to reconnect");
    });
  }
}
