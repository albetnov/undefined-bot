import { Message } from "discord.js";
import flutter from "../Boot/flutter";
import BaseListener, { HandlerProps } from "../Utils/BaseListener";
import { setEnv } from "../Utils/env";

export class DevListener extends BaseListener<Message> {
  name = "SetFlutterChannel";

  handler({ parameters, client, response }: HandlerProps<Message>) {
    if (!parameters || parameters.length <= 0 || parameters[0].trim() === "") {
      response.channel.send("Channel ID is required!");
      return;
    }

    const lookForNumber = parameters[0].match(/\d/g);

    if (!lookForNumber) {
      response.channel.send({ content: "Channel is invalid!" });
      return;
    }

    const parsed = lookForNumber.join("");

    const channel = client.channels.cache.get(parsed);

    if (!channel) {
      response.channel.send({ content: "Channel not found." });
      return;
    }

    setEnv("FLUTTER_CHANNEL_ID", parsed);
    flutter(client);
    response.channel.send({
      content: `Flutter channel has been set to ${channel?.toString()}`,
    });
  }
}
