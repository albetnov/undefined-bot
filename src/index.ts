import { config } from "dotenv";
config();
import { Client, Routes, REST, GatewayIntentBits } from "discord.js";
import { kernel } from "./Kernel";
import BootKernel from "./Boot/Kernel";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

const boot = BootKernel;

client.on("ready", () => {
  console.log("Artisan is painting... 🖌️");

  boot.forEach((item) => {
    item(client);
  });
});

const commands = kernel;

client.on("interactionCreate", (iteraction) => {
  if (!iteraction.isChatInputCommand()) return;

  commands.forEach((item) => {
    if (iteraction.commandName === item.name) {
      item.handler(iteraction, client);
    }
  });
});

async function main() {
  try {
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), {
      body: commands.map((item) => {
        return item.schema;
      }),
    });
    client.login(process.env.TOKEN);
  } catch (err) {
    console.error(err);
  }
}

main();
