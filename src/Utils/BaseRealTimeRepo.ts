import { Client } from "discord.js";
import { DocumentData } from "firebase/firestore";
import BaseRepository from "./BaseRepository";

export default abstract class BaseRealtimeRepository extends BaseRepository {
  abstract listen(client: Client): void;
  abstract afterListen(client: Client, data: DocumentData[]): void | Promise<void>;
}
