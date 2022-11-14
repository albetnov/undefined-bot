import BaseListener, { HandlerProps } from "../Utils/BaseListener";

export class RefreshCache extends BaseListener {
  name = "RefreshCache";

  async handler({ response }: HandlerProps) {
    response.channel.send("Cache refreshed");
  }
}
