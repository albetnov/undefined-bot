import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "..";
import BaseRepository from "../Utils/BaseRepository";
import { getRandomGeneratedId } from "../Utils/random";

export default class LoveRepository extends BaseRepository {
  name = "loves";

  async engage(userId: string, characterId?: string) {
    await setDoc(doc(db, "users", userId), {
      hasLove: characterId ? true : false,
      id: characterId ?? null,
    });

    if (characterId) {
      await updateDoc(doc(db, "loves", characterId), {
        owned: userId,
      });
    }
  }

  async getUser(userId: string) {
    return await getDoc(doc(db, "users", userId));
  }

  async getRandomItem(): Promise<DocumentData> {
    const loves = collection(db, "loves");

    const randomIndex = getRandomGeneratedId();
    const q = query(loves, where("__name__", ">=", randomIndex), orderBy("__name__"), limit(1));
    const querySnapshot = await getDocs(q);

    const result = querySnapshot.docs
      .filter((item) => item.exists())
      .map((item) => {
        const data = item.data();
        data.id = item.id;

        return data;
      });

    if (result.length <= 0) {
      return this.getRandomItem();
    } else {
      return result[0];
    }
  }

  async divorce(characterId: string) {
    await updateDoc(doc(db, "loves", characterId), {
      owned: null,
    });
  }
}
