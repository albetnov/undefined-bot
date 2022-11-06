import about, { aboutSchema } from "./Commands/about";
import dev, { devSchema } from "./Commands/dev";
import Spirit from "./Commands/Spirit";
import ping, { pingSchema } from "./Commands/ping";
import KernelClassRegisterer from "./Utils/KernelClassRegisterer";
import KernelRegisterer from "./Utils/KernelRegisterer";
import Roadmap from "./Commands/Roadmap";

export const kernel = [
  KernelClassRegisterer(new Spirit()),
  KernelClassRegisterer(new Roadmap()),
  new KernelRegisterer("ping").applySchema(pingSchema).register(ping),
  new KernelRegisterer("about").applySchema(aboutSchema).register(about),
  new KernelRegisterer("dev").applySchema(devSchema).register(dev),
];
