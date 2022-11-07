import About from "../Commands/About";
import Dev from "../Commands/Dev";
import Ping from "../Commands/Ping";
import Roadmap from "../Commands/Roadmap";
import Spirit from "../Commands/Spirit";
import KernelClassRegisterer from "../Utils/KernelClassRegisterer";

export default [
  KernelClassRegisterer(new Spirit()),
  KernelClassRegisterer(new Roadmap()),
  KernelClassRegisterer(new Dev()),
  KernelClassRegisterer(new Ping()),
  KernelClassRegisterer(new About()),
];
