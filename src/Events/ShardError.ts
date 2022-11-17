import { Events } from "discord.js";
import LogRepository from "../Repositories/LogRepository";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";

export default class ShardError extends BaseEvent<Error> {
  type: string = Events.ShardError;

  handler({ action }: ActionInterface<Error>) {
    new LogRepository().addLog(action.message, action);
  }
}
