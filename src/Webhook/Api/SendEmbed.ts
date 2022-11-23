import BaseApi, { ApiMethods, ApiHandlerInterface } from "../../Utils/BaseApi";
import jSchema from "fluent-json-schema";
import { ChannelType, ColorResolvable, Colors, EmbedBuilder } from "discord.js";
import { FastifyReply } from "fastify";

type OrNull<T> = T | null;
type StringOrNull = OrNull<string>;

interface AuthorSchema {
  name: string;
  url: StringOrNull;
  iconUrl: StringOrNull;
}

interface FieldSchema {
  name: string;
  value: string;
  inline: OrNull<boolean>;
}

interface BodyInterface {
  title: string;
  description: string;
  author: OrNull<AuthorSchema>;
  fields?: FieldSchema[];
  color: OrNull<ColorResolvable>;
  thumbnail: StringOrNull;
  image: StringOrNull;
  channel_id: string;
}

export default class SendEmbed extends BaseApi<Promise<FastifyReply>> {
  url = "/sendEmbed";
  method: ApiMethods = ApiMethods.POST;

  title = "";
  description = "";
  color: ColorResolvable | null = null;
  fields: FieldSchema[] = [];
  image: StringOrNull = null;
  thumbnail: StringOrNull = null;
  author: OrNull<AuthorSchema> = null;

  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }

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

  schema() {
    return this.extendSchema({
      body: jSchema
        .object()
        .prop(
          "author",
          jSchema.anyOf([
            jSchema
              .object()
              .prop("name", jSchema.string().minLength(1).required())
              .prop(
                "iconURL",
                jSchema.anyOf([jSchema.string().format(jSchema.FORMATS.URL), jSchema.null()])
              )
              .prop(
                "url",
                jSchema.anyOf([jSchema.string().format(jSchema.FORMATS.URL), jSchema.null()])
              ),
            jSchema.null(),
          ])
        )
        .prop("description", jSchema.string().minLength(1).required())
        .prop("title", jSchema.string().minLength(1).required())
        .prop(
          "fields",
          jSchema.anyOf([
            jSchema.array().items(
              jSchema
                .object()
                .prop("name", jSchema.string().minLength(1).required())
                .prop("value", jSchema.string().minLength(1).required())
                .prop("inline", jSchema.anyOf([jSchema.boolean(), jSchema.null()]))
            ),
            jSchema.null(),
          ])
        )
        .prop("color", jSchema.anyOf([jSchema.string(), jSchema.null()]))
        .prop(
          "thumbnail",
          jSchema.anyOf([jSchema.string().format(jSchema.FORMATS.URL), jSchema.null()])
        )
        .prop(
          "image",
          jSchema.anyOf([jSchema.string().format(jSchema.FORMATS.URL), jSchema.null()])
        )
        .prop("channel_id", jSchema.string().minLength(1).required()),
    });
  }

  async handler({ req, res, client }: ApiHandlerInterface) {
    const body = req.body as BodyInterface;
    this.title = body.title;
    this.description = body.description;

    if ("author" in body && body.author) {
      this.author = body.author;
    }

    if ("fields" in body && body.fields) {
      this.fields = body.fields;
    }

    if ("color" in body && body.color) {
      this.color = body.color;
    }

    if ("thumbnail" in body && body.thumbnail && body.thumbnail.trim() !== "") {
      this.thumbnail = body.thumbnail;
    }

    if ("image" in body && body.image && body.image.trim() !== "") {
      this.image = body.image;
    }

    const channel = client.channels.cache.get(body.channel_id);

    if (!channel || channel.type !== ChannelType.GuildText) {
      return res.status(400).send({ error: "Channel ID invalid" });
    }

    channel.send({ embeds: [this.embed()] });

    return res.send({ message: "Embed sent" });
  }
}
