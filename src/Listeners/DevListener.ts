import { Client, Message } from "discord.js";
import flutter from "../Boot/flutter";
import BaseListener from "../Utils/BaseListener";

export const ListenerProps = {
  data: "",
  listen: false,
};

export class DevListener extends BaseListener<string> {
  name = "SetFlutterChannel";
  listener = ListenerProps;

  afterHook<T>(listen: boolean, data: T) {
    if (typeof data !== "string") return;
    this.listener.listen = listen;
    this.listener.data = data;
  }

  handler(parameters: string[], client: Client, response: Message) {
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

    process.env.FLUTTER_CHANNEL_ID = parsed;
    flutter(client);
    response.channel.send({
      content: `Flutter channel has been set to ${channel?.toString()}`,
    });
  }
}
