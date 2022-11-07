/**
 * Is it important to set env for Timezone before dotenv load.
 * this environment applied so that server's timezone will sync with local.
 */
process.env.TZ = "Asia/Jakarta";
import { config } from "dotenv";
config();
import { Client, Routes, REST, GatewayIntentBits } from "discord.js";
import Commands from "./Kernels/Commands";
import Events from "./Kernels/Events";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

Events.forEach((item) => {
  client.on(item.type, (action) => item.handler({ action, client }));
});

async function main() {
  try {
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), {
      body: Commands.map((item) => {
        return item.schema;
      }),
    });
    client.login(process.env.TOKEN);
  } catch (err) {
    console.error(err);
  }
}

main();
