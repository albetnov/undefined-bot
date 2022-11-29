import { Routes } from "discord.js";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { db, rest } from "..";
import loader from "../Kernels/Commands";
import BaseRealtimeRepository from "../Utils/BaseRealTimeRepo";
import env from "../Utils/env";

export default class SettingsRepository extends BaseRealtimeRepository {
  name = "settings";

  afterListen({ data }: { data: DocumentData }) {
    if (!data.value) {
      console.log(loader.filter((item) => item.name !== "roadmap").map((item) => item.schema));
      rest.put(Routes.applicationGuildCommands(env("CLIENT_ID"), env("GUILD_ID")), {
        body: loader.filter((item) => item.name !== "roadmap").map((item) => item.schema),
      });
    } else {
      rest.put(Routes.applicationGuildCommands(env("CLIENT_ID"), env("GUILD_ID")), {
        body: loader.map((item) => item.schema),
      });
    }
  }

  listen() {
    onSnapshot(doc(db, "settings", "enable_roadmap"), (snapshot) => {
      if (!snapshot.exists()) {
        return;
      }

      this.afterListen({ data: snapshot.data() });
    });
  }
}
