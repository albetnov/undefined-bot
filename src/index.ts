/**
 * Is it important to set env for Timezone before dotenv load.
 * this environment applied so that server's timezone will sync with local.
 */
process.env.TZ = "Asia/Jakarta";
import { config } from "dotenv";
config();
import { Client, Routes, REST, GatewayIntentBits } from "discord.js";
import { kernel } from "./Kernel";
import BootKernel from "./Boot/Kernel";
import { devEvents, listener } from "./Commands/dev";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

const boot = BootKernel;

client.on("ready", () => {
  console.log("Artisan is painting... 🖌️");

  boot.forEach((item) => {
    item(client);
  });
});

const commands = kernel;

/**
 * This should only be used for developer.
 */
client.on("messageCreate", (message) => {
  if (listener.listen) {
    if (
      !message.content ||
      !message.content.startsWith("Artisan:") ||
      message.author.id !== listener.user
    )
      return;
    let args = message.content.split(":")[1];

    devEvents.forEach((item) => {
      let parameters = args.split(" ");

      if (parameters.length > 0) {
        args = parameters[0];
        parameters.shift();
      }

      if (args.toLowerCase() === item.name.toLocaleLowerCase()) {
        item.handler(parameters, client, message);
      }
    });
  }
});

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
