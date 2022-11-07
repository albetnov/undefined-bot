import about, { aboutSchema } from "./Commands/about";
import Spirit from "./Commands/Spirit";
import ping, { pingSchema } from "./Commands/ping";
import KernelClassRegisterer from "./Utils/KernelClassRegisterer";
import KernelRegisterer from "./Utils/KernelRegisterer";
import Roadmap from "./Commands/Roadmap";
import { DevListener } from "./Listeners/DevListener";
import Dev from "./Commands/Dev";

export const kernel = [
  KernelClassRegisterer(new Spirit()),
  KernelClassRegisterer(new Roadmap()),
  KernelClassRegisterer(new Dev()),
  new KernelRegisterer("ping").applySchema(pingSchema).register(ping),
  new KernelRegisterer("about").applySchema(aboutSchema).register(about),
  // new KernelRegisterer("dev").applySchema(devSchema).register(dev),
];

// Register your listener here.
export const listenerKernel = [new DevListener()];
