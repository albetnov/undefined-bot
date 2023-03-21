import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "..";
import BaseRepository from "../Utils/BaseRepository";

export default class LoveRepository extends BaseRepository {
  name = "love";

  async save(userId: string, characterId?: number) {
    await setDoc(doc(db, "users", userId), {
      hasLove: characterId ? true : false,
      id: characterId ?? null,
    });
  }

  async getUser(userId: string) {
    return await getDoc(doc(db, "users", userId));
  }
}
