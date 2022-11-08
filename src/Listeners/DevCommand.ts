import { Message } from "discord.js";
import BaseListener, { HandlerProps } from "../Utils/BaseListener";
import env from "../Utils/env";

export class DevCommand extends BaseListener<Message> {
  name = "DevCommand";

  handler({ response }: HandlerProps<Message>) {
    const user = response.guild?.members.cache.get(env("AUTHORIZED_ID"));
    if (!user) {
      console.log("User not exist.");
      return;
    }

    user.roles.add(env("STARTING_ROLE"));
    response.channel.send("Role added!");
  }
}
