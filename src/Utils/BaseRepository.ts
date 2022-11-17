import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "..";

export default abstract class BaseRepository {
  abstract name: string;

  constructor() {
    this.get = this.get.bind(this);
    this.find = this.find.bind(this);
  }

  async get() {
    return await getDocs(collection(db, this.name));
  }

  async mapToKeyAndValue() {
    const before = await this.get();
    return before.docs.map((item) => {
      const data = item.data();
      return {
        name: data.name,
        value: data.value,
      };
    });
  }

  async find(filter: string) {
    const docRef = doc(db, this.name, filter);
    return await getDoc(docRef);
  }
}
