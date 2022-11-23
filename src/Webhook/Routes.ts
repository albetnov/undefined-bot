import Route from "../Utils/Route";
import ChannelList from "./Api/ChannelList";
import Ping from "./Api/Ping";
import RefreshCache from "./Api/RefreshCache";
import SendEmbed from "./Api/SendEmbed";
import SendMessage from "./Api/SendMessage";

const routes = [
  Route(new RefreshCache()),
  Route(new Ping()),
  Route(new SendMessage()),
  Route(new SendEmbed()),
  Route(new ChannelList()),
];

export default routes;
