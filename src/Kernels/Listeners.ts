import { CastRules } from "../Listeners/CastRules";
import { SetByeChannel } from "../Listeners/SetByeChannel";
import { SetFlutterChannel } from "../Listeners/SetFlutterChannel";
import { SetWelcomeChannel } from "../Listeners/SetWelcomeChannel";

export default [
  new SetFlutterChannel(),
  new CastRules(),
  new SetWelcomeChannel(),
  new SetByeChannel(),
];
