import BaseListener, { HandlerProps } from "../Utils/BaseListener";
import demandForNumber from "../Utils/demandForNumber";
import { setEnv } from "../Utils/env";

export class SetWelcomeChannel extends BaseListener {
  name = "SetWelcomeChannel";

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

    setEnv("WELCOME_CHANNEL_ID", checkParam.content!);

    response.channel.send({
      content: `Welcome channel has been set to ${channel?.toString()}`,
    });
  }
}
