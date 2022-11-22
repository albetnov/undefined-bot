import BaseApi from "./BaseApi";

export default function Route<T>(handler: BaseApi<T>) {
  return {
    url: handler.url,
    handler: handler.handler,
    schema: handler.schema(),
    type: handler.method,
  };
}
