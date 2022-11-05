import about, { aboutSchema } from "./Commands/about.js";
import dev, { devSchema } from "./Commands/dev.js";
import ping, { pingSchema } from "./Commands/ping.js";

const kernel = [
  {
    schema: pingSchema,
    handler: ping,
    name: "ping",
  },
  {
    schema: aboutSchema,
    handler: about,
    name: "about",
  },
  {
    schema: devSchema,
    handler: dev,
    name: "dev",
  },
];

export const loadKernel = () => kernel;
