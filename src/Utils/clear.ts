import { config } from "dotenv";
config();
import { REST, Routes } from "discord.js";
import readline from "readline";
import env from "./env";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const rest = new REST({ version: "10" }).setToken(env("TOKEN"));

rl.question("What is your commandId? ", async (answer) => {
  try {
    await rest.delete(Routes.applicationGuildCommand(env("CLIENT_ID"), env("GUILD_ID"), answer));
    console.log("Command deleted successfully.");
    process.exit(0);
  } catch (err: any) {
    console.log(err.message);
    process.exit(0);
  }
});

rl.on("close", () => {
  console.log("Bye!");
  process.exit(0);
});
