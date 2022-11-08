import { ActivityType, Client } from "discord.js";

export default async function status(client: Client) {
  client.user?.setActivity("CodeWars", { type: ActivityType.Competing });
  client.user?.setStatus("idle");
}
