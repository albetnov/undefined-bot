import BaseListener, { SocketListenerHandler } from "./BaseListener";

export interface KernelableSocket {
  ev: string;
  listener(param: SocketListenerHandler): void;
}

export default (classRef: new () => BaseListener) => {
  const instance = new classRef();

  return {
    ev: instance.socket,
    listener: instance.handler,
  };
};
