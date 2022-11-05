import { config } from "dotenv";
config();
import { Client, Routes, REST } from "discord.js";
import { loadKernel } from "./Kernel.js";

const client = new Client({ intents: [] });
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

client.on("ready", () => {
  console.log("Artisan is painting... 🖌️");
});

const commands = loadKernel();

client.on("interactionCreate", (iteraction) => {
  if (!iteraction.isChatInputCommand()) return;

  commands.forEach((item) => {
    if (iteraction.commandName === item.name) {
      item.handler(iteraction);
    }
  });
});

async function main() {
  try {
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
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
