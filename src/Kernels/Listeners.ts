import { DevCommand } from "../Listeners/DevCommand";
import { SetByeChannel } from "../Listeners/SetByeChannel";
import { SetFlutterChannel } from "../Listeners/SetFlutterChannel";
import { SetWelcomeChannel } from "../Listeners/SetWelcomeChannel";

export default [
  new SetFlutterChannel(),
  new DevCommand(),
  new SetWelcomeChannel(),
  new SetByeChannel(),
];
