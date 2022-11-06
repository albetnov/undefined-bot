import { ChatInputCommandInteraction } from "discord.js";
import RoadmapLoader from "../../Utils/RoadmapLoader";
import flutterHandler from "./flutter";

const loader = [new RoadmapLoader("flutter").register(flutterHandler)];

export const loadKernel = (type: string | null, action: ChatInputCommandInteraction) => {
  if (!type) return;

  loader.forEach((item) => {
    if (type === item.name) {
      item.handler(action);
    }
  });
};

export default loader;
