import About from "../Commands/About";
import ClearMessage from "../Commands/ClearMessage";
import Dev from "../Commands/Dev";
import Ping from "../Commands/Ping";
import Roadmap from "../Commands/Roadmap";
import Spirit from "../Commands/Spirit";
import YouBadBad from "../Commands/YouBadBad";
import KernelClassRegisterer, { CommandSchema } from "../Utils/KernelClassRegisterer";

const loader: CommandSchema[] = [
  KernelClassRegisterer(new Spirit()),
  KernelClassRegisterer(new Roadmap()),
  KernelClassRegisterer(new Dev()),
  KernelClassRegisterer(new Ping()),
  KernelClassRegisterer(new About()),
  KernelClassRegisterer(new ClearMessage()),
  KernelClassRegisterer(new YouBadBad()),
];

export default loader;
