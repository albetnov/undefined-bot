/**
 * Is it important to set env for Timezone before dotenv load.
 * this environment applied so that server's timezone will sync with local.
 */
import { config } from "dotenv";
config();
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import env from "./Utils/env";
import pino from "pino";
export const logger = pino();

// Initialize Firebase
const firebaseConfig = {
  apiKey: env("FIREBASE_API_INTEGRATION"),
  authDomain: env("FIREBASE_URL"),
  projectId: env("FIREBASE_APP_NAME"),
  storageBucket: env("FIREBASE_BUCKET"),
  messagingSenderId: env("FIREBASE_SENDER_ID"),
  appId: env("FIREBASE_APP_ID"),
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const auth = getAuth(app);

async function login() {
  const user = await signInWithEmailAndPassword(
    auth,
    env("FIREBASE_AUTH_EMAIL"),
    env("FIREBASE_AUTH_PASSWORD")
  );
  logger.info("[AUTH]:");
  logger.info(user.user);
}

login();

import { Client, Routes, REST, GatewayIntentBits } from "discord.js";
import Commands from "./Kernels/Commands";
import Events from "./Kernels/Events";
import LogRepository from "./Repositories/LogRepository";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
  ],
});
export const rest = new REST({ version: "10" }).setToken(env("TOKEN"));
const insertLog = new LogRepository().addLog;

if (env("ENABLE_WEBSOCKET") === "true" && env("ENABLE_WEBHOOK") === "true") {
  logger.error("[ERROR]: EITHER WEBSOCKET OR WEBHOOK. CHOOSE ONE OF IT.");
  logger.info(
    "[INFO]: If your host can run both bot and the server. Webhook is recommended. As implementing WS is costly."
  );
  logger.info(
    "[INFO]: But if your host unable to do so. You may need to host Websocket Bridge and use Websocket"
  );
  process.exit(1);
}

Events.forEach((item) => {
  try {
    client.on(item.type, (action) => {
      item.handler({ action, client });
    });
  } catch (err: any) {
    insertLog(err.message, err);
  }
});

async function main() {
  try {
    await rest.put(Routes.applicationGuildCommands(env("CLIENT_ID"), env("GUILD_ID")), {
      body: Commands.map((item) => {
        return item.schema;
      }),
    });
    client.login(env("TOKEN"));
  } catch (err: any) {
    insertLog(err.message, err);

    logger.error(err);
  }
}

main();

process.on("unhandledRejection", (error: any) => {
  insertLog(error.message, error);
  logger.error(error);
});
