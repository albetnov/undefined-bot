import { AboutSystem } from "../Listeners/AboutSystem";
import { CastRules } from "../Listeners/CastRules";
import { RefreshCache } from "../Listeners/RefreshCache";
import BaseListener from "../Utils/BaseListener";

const loader: BaseListener[] = [new CastRules(), new RefreshCache(), new AboutSystem()];

export default loader;
