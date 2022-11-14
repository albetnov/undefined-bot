import { doc, getDoc } from "firebase/firestore";
import { db } from "..";

export default async function getRoadmap(language: string) {
  const docRef = doc(db, "roadmap", language);
  return await getDoc(docRef);
}
