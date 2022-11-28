import { ChannelType } from "discord.js";
import { z } from "zod";
import BaseListener, { SocketListenerHandler } from "./BaseListener";

export default class SendMessage extends BaseListener {
  socket: string = "SendMessage";

  handler({ params, client }: SocketListenerHandler) {
    const [body, callback] = params;

    const sendMessageSchema = z.object({
      channel_id: z.string().min(1),
      message: z.string().min(1),
    });

    const result = sendMessageSchema.safeParse(body);

    const response: {
      error: string | null;
      success: boolean;
    } = {
      error: null,
      success: result.success,
    };

    if (result.success) {
      const channel = client.channels.cache.get(result.data.channel_id);
      if (!channel || channel.type !== ChannelType.GuildText) {
        response.error = "Channel type invalid: not text.";
      } else {
        channel.send(result.data.message);
      }
    }

    callback(response);
  }
}
