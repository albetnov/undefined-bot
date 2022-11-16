import { collection, getDocs } from "firebase/firestore";
import { db } from "..";

export default async function getRoles() {
  const roles = await getDocs(collection(db, "roles"));

  return roles.docs.map((item) => {
    const data = item.data();
    return {
      name: data.name,
      value: data.value,
    };
  });
}
