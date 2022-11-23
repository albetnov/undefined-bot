import BaseApi, { ApiMethods, ApiHandlerInterface } from "../../Utils/BaseApi";
import jSchema from "fluent-json-schema";
import { ChannelType, ColorResolvable, Colors, EmbedBuilder } from "discord.js";
import { FastifyReply } from "fastify";

interface AuthorSchema {
  name: string;
  url?: string;
  iconUrl?: string;
}

interface FieldSchema {
  name: string;
  value: string;
  inline?: boolean;
}

interface BodyInterface {
  title: string;
  description: string;
  author?: AuthorSchema;
  fields?: FieldSchema[];
  color?: ColorResolvable;
  thumbnail?: string;
  image?: string;
  channel_id: string;
}

export default class SendEmbed extends BaseApi<Promise<FastifyReply>> {
  url = "/sendEmbed";
  method: ApiMethods = ApiMethods.POST;

  title = "";
  description = "";
  color: ColorResolvable | null = null;
  fields: FieldSchema[] = [];
  image: string | null = null;
  thumbnail: string | null = "";
  author: AuthorSchema | null = null;

  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }

  embed() {
    return new EmbedBuilder()
      .setAuthor(this.author)
      .setTitle(this.title)
      .setDescription(this.description)
      .setColor(this.color)
      .setFields(...this.fields)
      .setImage(this.image)
      .setThumbnail(this.thumbnail);
  }

  schema() {
    return this.extendSchema({
      body: jSchema
        .object()
        .prop(
          "author",
          jSchema
            .object()
            .prop("name", jSchema.string().required())
            .prop("iconURL", jSchema.string())
            .prop("url", jSchema.string())
        )
        .prop("description", jSchema.string().required())
        .prop("title", jSchema.string().required())
        .prop(
          "fields",
          jSchema
            .array()
            .items(
              jSchema
                .object()
                .prop("name", jSchema.string().required())
                .prop("value", jSchema.string().required())
                .prop("inline", jSchema.boolean())
            )
        )
        .prop("color", jSchema.string())
        .prop("thumbnail", jSchema.string())
        .prop("image", jSchema.string())
        .prop("channel_id", jSchema.string().required()),
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

    if ("thumbnail" in body && body.thumbnail) {
      this.thumbnail = body.thumbnail;
    }

    if ("image" in body && body.image) {
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
