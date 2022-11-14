import { Events } from "discord.js";
import insertLog from "../Repositories/InsertLog";
import BaseEvent, { ActionInterface } from "../Utils/BaseEvent";

export default class ShardError extends BaseEvent<Error> {
  type: string = Events.ShardError;

  handler({ action }: ActionInterface<Error>) {
    insertLog(action.message, action);
  }
}
