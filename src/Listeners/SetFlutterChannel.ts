import flutter from "../Boot/flutter";
import BaseListener, { HandlerProps } from "../Utils/BaseListener";
import demandForNumber from "../Utils/demandForNumber";
import { setEnv } from "../Utils/env";

export class SetFlutterChannel extends BaseListener {
  name = "SetFlutterChannel";

  handler({ parameters, client, response }: HandlerProps) {
    const getParam = demandForNumber(parameters, "Channel ID");

    if (getParam.invalid) {
      response.channel.send(getParam.content!);
      return;
    }

    const channel = client.channels.cache.get(getParam.content!);

    if (!channel) {
      response.channel.send({ content: "Channel not found." });
      return;
    }

    setEnv("FLUTTER_CHANNEL_ID", getParam.content!);
    flutter(client);
    response.channel.send({
      content: `Flutter channel has been set to ${channel?.toString()}`,
    });
  }
}
