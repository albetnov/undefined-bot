import { ChatInputCommandInteraction, Client, Message, SlashCommandBuilder } from "discord.js";
import flutter from "../Boot/flutter";

export const devSchema = new SlashCommandBuilder()
  .setName("dev")
  .setDescription("Enable the settings of this Bot right in time!")
  .toJSON();

export const listener = {
  listen: false,
  user: "",
};

export const devEvents = [
  {
    name: "SetFlutterChannel",
    handler(parameters: string[], client: Client, response: Message) {
      if (!parameters || parameters.length <= 0 || parameters[0].trim() === "") {
        response.channel.send("Channel ID is required!");
        return;
      }

      const channel = client.channels.cache.get(parameters[0]);

      if (!channel) {
        response.channel.send({ content: "Channel ID invalid!" });
        return;
      }

      process.env.FLUTTER_CHANNEL_ID = parameters[0];
      flutter(client);
      response.channel.send({
        content: `Flutter channel has been set to ${channel?.toString()}`,
      });
    },
  },
];

export default (action: ChatInputCommandInteraction) => {
  if (!action.guild) return;

  if (action.user.id !== process.env.AUTHORIZED_ID) {
    action.reply({ content: "Only bot author allowed to do this command!", ephemeral: true });
    return;
  }

  listener.listen = true;

  listener.user = action.user.id;

  action.reply(
    "Development Mode: Interactive Mode Enabled. I will listening to message with prefix 'Artisan:'."
  );
};
