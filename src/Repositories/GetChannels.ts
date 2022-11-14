import { collection, getDocs } from "firebase/firestore";
import { db } from "..";

export default async function getChannels() {
  const channels = await getDocs(collection(db, "channels"));

  return channels.docs.map((item) => {
    const data = item.data();
    return {
      name: data.name,
      value: data.value,
    };
  });
}
