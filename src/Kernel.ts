import Spirit from "./Commands/Spirit";
import KernelClassRegisterer from "./Utils/KernelClassRegisterer";
import Roadmap from "./Commands/Roadmap";
import { DevListener } from "./Listeners/DevListener";
import Dev from "./Commands/Dev";
import Ping from "./Commands/Ping";
import About from "./Commands/About";

export const kernel = [
  KernelClassRegisterer(new Spirit()),
  KernelClassRegisterer(new Roadmap()),
  KernelClassRegisterer(new Dev()),
  KernelClassRegisterer(new Ping()),
  KernelClassRegisterer(new About()),
];

// Register your listener here.
export const listenerKernel = [new DevListener()];
