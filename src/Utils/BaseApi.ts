import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import jSchema from "fluent-json-schema";

interface SchemaExtension {
  qs?: object;
  body?: object;
  res?: object;
}

export enum ApiMethods {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export default abstract class BaseApi<T> {
  abstract method: ApiMethods;
  abstract url: string;

  baseSchema(extension?: SchemaExtension): RouteShorthandOptions {
    if (!extension) {
      return {
        schema: {
          querystring: jSchema.object().prop("adminKey", jSchema.string().required()),
        },
      };
    }
    return {
      schema: {
        querystring: {
          type: "object",
          properties: {
            adminKey: { type: "string" },
            ...extension.qs,
          },
        },
        body: extension.body,
        response: extension.res,
      },
    };
  }

  extendSchema(schema: SchemaExtension) {
    return this.baseSchema(schema);
  }

  schema(): RouteShorthandOptions {
    return this.baseSchema();
  }

  abstract handler(request: FastifyRequest, response: FastifyReply): T;
}
