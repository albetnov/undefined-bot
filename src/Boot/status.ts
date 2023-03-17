import { ActivityType, Client } from "discord.js";

export default async function status(client: Client) {
  client.user?.setActivity("Golang", { type: ActivityType.Playing });
  client.user?.setStatus("idle");
}
