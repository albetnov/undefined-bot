import { logger } from "../..";
import BaseListener, { SocketListenerHandler } from "./BaseListener";

export interface KernelableSocket {
  ev: string;
  listen(): (param: SocketListenerHandler) => void;
}

export default (classRef: new () => BaseListener) => {
  const instance = new classRef();

  return {
    ev: instance.socket,
    listen: () => {
      logger.info(`[WebSocket]: ${instance.socket} triggered.`);
      return instance.handler;
    },
  };
};
