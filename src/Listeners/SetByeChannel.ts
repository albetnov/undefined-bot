import BaseListener, { HandlerProps } from "../Utils/BaseListener";
import demandForNumber from "../Utils/demandForNumber";
import { setEnv } from "../Utils/env";

export class SetByeChannel extends BaseListener {
  name = "SetByeChannel";

  handler({ parameters, client, response }: HandlerProps) {
    const checkParam = demandForNumber(parameters, "Channel ID");

    if (checkParam.invalid) {
      response.channel.send(checkParam.content!);
      return;
    }

    const channel = client.channels.cache.get(checkParam.content!);

    if (!channel) {
      response.channel.send({ content: "Channel not found." });
      return;
    }

    setEnv("BYE_CHANNEL_ID", checkParam.content!);

    response.channel.send({
      content: `Bye channel has been set to ${channel?.toString()}`,
    });
  }
}
