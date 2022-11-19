import ChannelRepository from "../Repositories/ChannelRepository";
import writeToCache from "../Utils/WriteToCache";

export default async function refreshChannels() {
  const channels = await new ChannelRepository().mapToKeyAndValue();
  const content = JSON.stringify(channels);
  writeToCache("channels", content);
}
