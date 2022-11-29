import { Client } from "discord.js";
import { DocumentData } from "firebase/firestore";
import BaseRepository from "./BaseRepository";

export interface AfterListenProps {
  client?: Client;
  data: DocumentData[] | DocumentData;
}
export default abstract class BaseRealtimeRepository extends BaseRepository {
  abstract listen(client: Client): void;
  abstract afterListen({ client, data }: AfterListenProps): void | Promise<void>;
}
