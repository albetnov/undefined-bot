import { Events, Message } from "discord.js";
import { listenerKernel } from "../Kernel";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";

export default class MessageCreate extends BaseEvent<Message> {
  type: string = Events.MessageCreate;

  handler({ action: message, client }: ActionInterface<Message>) {
    listenerKernel.forEach((item) => {
      if (item.listener.listen) {
        if (
          !message.content ||
          !message.content.startsWith("Artisan:") ||
          message.author.id !== item.listener.data
        )
          return;

        let args = message.content.split(":")[1];

        let parameters = args.split(" ");

        if (parameters.length > 0) {
          args = parameters[0];
          parameters.shift();
        }

        if (args.toLowerCase() === item.name.toLocaleLowerCase()) {
          if (!client) return;
          item.handler(parameters, client, message);
        }

        if (args.toLowerCase() === "exit") {
          item.listener.listen = false;
          message.channel.send("Interactive Mode End.");
        }
      }
    });
  }
}
