import { addDoc, collection } from "firebase/firestore";
import { db } from "..";

export default async function insertLog(message: string, exception: object) {
  await addDoc(collection(db, "logging"), {
    message,
    details: JSON.stringify(exception),
  });
}
