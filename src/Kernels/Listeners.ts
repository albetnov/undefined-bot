import { CastRules } from "../Listeners/CastRules";
import { RefreshCache } from "../Listeners/RefreshCache";
import BaseListener from "../Utils/BaseListener";

const loader: BaseListener[] = [new CastRules(), new RefreshCache()];

export default loader;
