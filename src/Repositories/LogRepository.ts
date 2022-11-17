import { addDoc, collection } from "firebase/firestore";
import { db } from "..";
import BaseRepository from "../Utils/BaseRepository";

export default class LogRepository extends BaseRepository {
  name = "logging";
  async addLog(message: string, exception: object) {
    await addDoc(collection(db, this.name), {
      message,
      details: JSON.stringify(exception),
    });
  }
}
