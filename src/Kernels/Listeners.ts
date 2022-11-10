import { CastRules } from "../Listeners/CastRules";
import { SetByeChannel } from "../Listeners/SetByeChannel";
import { SetFlutterChannel } from "../Listeners/SetFlutterChannel";
import { SetWelcomeChannel } from "../Listeners/SetWelcomeChannel";
import BaseListener from "../Utils/BaseListener";

const loader: BaseListener[] = [
  new SetFlutterChannel(),
  new CastRules(),
  new SetWelcomeChannel(),
  new SetByeChannel(),
];

export default loader;
