import { ChannelType, Client, EmbedBuilder } from "discord.js";
import { collection, DocumentData, onSnapshot, query } from "firebase/firestore";
import { gracefulShutdown, scheduleJob } from "node-schedule";
import { db, logger } from "..";
import BaseRealtimeRepository from "../Utils/BaseRealTimeRepo";

export default class ScheduleRepository extends BaseRealtimeRepository {
  name = "scheduler";

  async afterListen(client: Client, data: DocumentData[]) {
    logger.info("[RealTime Repo]: Resetting all schedules");
    await gracefulShutdown();

    if (!data) {
      data = [];
      const result = await new ScheduleRepository().get();
      result.forEach((item) => {
        data?.push(item.data());
      });
    }

    data.map((item) => {
      const channel = client.channels.cache.get(item.channel_id);

      if (!channel || channel.type !== ChannelType.GuildText) {
        logger.warn(item.title + " : Job skipped");
        return;
      }

      scheduleJob(item.execute_when.toDate(), () => {
        const embeds = new EmbedBuilder()
          .setTitle(item.title)
          .setDescription(item.description)
          .setImage(item.image);

        channel.send({ embeds: [embeds] });
      });
    });
  }

  listen(client: Client) {
    onSnapshot(query(collection(db, this.name)), (snapshot) => {
      const data: DocumentData[] = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      this.afterListen(client, data);
    });
  }
}
