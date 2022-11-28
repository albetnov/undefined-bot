import { Client } from "discord.js";
import { logger } from "..";
import { io } from "socket.io-client";
import env from "../Utils/env";
import Sockets from "./Listeners/Sockets";
import { KernelableSocket } from "./Listeners/sock";

export default class WebsocketClient {
  url = "";

  constructor() {
    if (env("APP_ENV", "development") === "production") {
      this.url = env("WEBSOCKET_URL_LIVE");
    } else {
      this.url = env("WEBSOCKET_URL", "http://localhost:3001");
    }
  }

  handler(client: Client) {
    const socket = io(this.url, {
      auth: {
        token: env("WEBSOCKET_TOKEN"),
      },
    });

    socket.on("connect", () => {
      logger.info(`[WebSocket]: Listening to Websocket at ${this.url}`);
      const engine = socket.io.engine;

      engine.once("upgrade", () => {
        logger.info("[WebSocket]: Socket Upgraded: " + engine.transport.name);
      });

      logger.info(`[WebSocket]: Connected: ${socket.id}`);
    });

    Sockets.forEach((item: KernelableSocket) => {
      socket.on(item.ev, (...args) => item.listen()({ params: args, client }));
    });

    socket.on("disconnect", () => {
      logger.warn("[WebSocket]: Socket disconnected.");
    });

    socket.io.on("reconnect_attempt", () => {
      logger.info("[WebSocket]: Reconnecting...");
    });

    socket.io.on("reconnect", () => {
      logger.warn("[WebSocket]: Attempt to reconnect");
    });

    socket.on("connect_error", (err) => {
      logger.error("[WebSocket]: Failed connect. " + err);
    });
  }
}
