import Route from "../Utils/Route";
import Ping from "./Api/Ping";
import RefreshCache from "./Api/RefreshCache";

const routes = [Route(new RefreshCache()), Route(new Ping())];

export default routes;
