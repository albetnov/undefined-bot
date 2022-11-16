import getRoles from "../Repositories/GetRoles";
import writeToCache from "../Utils/WriteToCache";

export default async function refreshRoles() {
  const roles = await getRoles();
  const content = JSON.stringify(roles);
  writeToCache("roles", content);
}
