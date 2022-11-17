import RolesRepository from "../Repositories/RolesRepository";
import writeToCache from "../Utils/WriteToCache";

export default async function refreshRoles() {
  const roles = await new RolesRepository().mapToKeyAndValue();
  const content = JSON.stringify(roles);
  writeToCache("roles", content);
}
