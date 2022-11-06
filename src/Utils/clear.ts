import { config } from "dotenv";
config();
import { REST, Routes } from "discord.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

rl.question("What is your commandId? ", async (answer) => {
  try {
    await rest.delete(
      Routes.applicationGuildCommand(process.env.CLIENT_ID!, process.env.GUILD_ID!, answer)
    );
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
