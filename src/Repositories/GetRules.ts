import { collection, getDocs } from "firebase/firestore";
import { db } from "..";

export default async function getRules() {
  return await getDocs(collection(db, "rules"));
}
