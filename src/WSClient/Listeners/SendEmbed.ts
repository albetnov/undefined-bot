import BaseListener, { SocketListenerHandler } from "./BaseListener";
import { z } from "zod";
import { AuthorSchema, FieldSchema, OrNull, StringOrNull } from "../../Webhook/Api/SendEmbed";
import { ChannelType, ColorResolvable, EmbedBuilder } from "discord.js";

export default class SendEmbed extends BaseListener {
  socket: string = "SendEmbed";
  private author: OrNull<AuthorSchema> = null;
  private fields: FieldSchema[] = [];
  private color: OrNull<ColorResolvable> = null;
  private title = "";
  private description = "";
  private image: StringOrNull = null;
  private thumbnail: StringOrNull = null;

  embed() {
    const author = this.author
      ? {
          name: this.author.name,
          url: this.author.url || undefined,
          iconUrl: this.author.iconUrl || undefined,
        }
      : null;

    const fields = this.fields
      ? this.fields.map((item) => ({
          ...item,
          inline: item.inline ? item.inline : false,
        }))
      : [];

    return new EmbedBuilder()
      .setAuthor(author)
      .setTitle(this.title)
      .setDescription(this.description)
      .setColor(this.color)
      .setFields(fields)
      .setImage(this.image)
      .setThumbnail(this.thumbnail);
  }

  handler({ params, client }: SocketListenerHandler) {
    const [body, callback] = params;

    const sendEmbedSchema = z.object({
      author: z
        .object({
          name: z.string().min(1),
          iconUrl: z.string().url().nullable(),
          url: z.string().url().nullable(),
        })
        .optional(),
      description: z.string().min(1),
      title: z.string().min(1),
      fields: z
        .array(
          z.object({
            name: z.string().min(1),
            value: z.string().min(1),
            inline: z.boolean().optional(),
          })
        )
        .optional(),
      color: z.string().nullable(),
      thumbnail: z.string().url().nullable(),
      image: z.string().url().nullable(),
      channel_id: z.string().min(1),
    });

    const result = sendEmbedSchema.safeParse(body);

    const response: {
      error: string | null;
      success: boolean;
    } = {
      error: null,
      success: result.success,
    };

    if (result.success) {
      if (result.data.author) {
        this.author = result.data.author;
      }

      if (result.data.fields) {
        this.fields = result.data.fields.map((item) => ({
          name: item.name,
          value: item.value,
          inline: item.inline || false,
        }));
      }

      this.title = result.data.title;
      this.color = result.data.color as ColorResolvable;
      this.description = result.data.description;
      this.image = result.data.image;
      this.thumbnail = result.data.thumbnail;

      const channel = client.channels.cache.get(result.data.channel_id);
      if (!channel || channel.type !== ChannelType.GuildText) {
        response.error = "Channel type invalid: not text.";
      } else {
        channel.send({ embeds: [this.embed()] });
      }
    }

    callback(response);
  }
}
