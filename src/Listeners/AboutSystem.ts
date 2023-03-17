import BaseListener, { HandlerProps } from "../Utils/BaseListener";

export class AboutSystem extends BaseListener {
  name = "AboutSystem";

  handler({ response }: HandlerProps): void {
    const memoryUsage = process.memoryUsage();
    response.channel.send(
      `Running in: ${process.version} On ${process.arch}/${
        process.platform
      } System. Resources Ram: ${memoryUsage.heapUsed}/${memoryUsage.heapTotal}, CPU: ${
        process.cpuUsage().user
      }`
    );
  }
}
