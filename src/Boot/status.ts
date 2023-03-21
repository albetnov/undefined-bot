import { ActivityType, Client } from "discord.js";

export default async function status(client: Client) {
  client.user?.setActivity("Lazy People (You)", { type: ActivityType.Watching });
  client.user?.setStatus("idle");
}
