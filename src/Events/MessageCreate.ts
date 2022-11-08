import { Events, Message } from "discord.js";
import Listeners from "../Kernels/Listeners";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";
import { ListenerProps } from "../Utils/BaseListener";

export default class MessageCreate extends BaseEvent<Message> {
  type: string = Events.MessageCreate;

  handler({ action: message, client }: ActionInterface<Message>) {
    Listeners.forEach((item) => {
      if (ListenerProps.listen) {
        if (
          !message.content ||
          !message.content.startsWith("Artisan:") ||
          message.author.id !== ListenerProps.user
        )
          return;

        let args = message.content.split(":")[1];

        let parameters = args.split(" ");

        if (parameters.length > 0) {
          args = parameters[0];
          parameters.shift();
        }

        if (args.toLowerCase() === item.name.toLowerCase()) {
          if (!client) return;
          item.handler({ parameters, client, response: message });
        }

        if (args.toLowerCase() === "exit") {
          ListenerProps.listen = false;
          message.channel.send("Interactive Mode End.");
        }
      }
    });
  }
}
