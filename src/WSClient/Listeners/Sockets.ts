import CastRules from "./CastRules";
import ChannelList from "./ChannelList";
import RefreshCache from "./RefreshCache";
import SendEmbed from "./SendEmbed";
import SendMessage from "./SendMessage";
import sock, { KernelableSocket } from "./sock";

const Sockets: KernelableSocket[] = [
  sock(RefreshCache),
  sock(ChannelList),
  sock(SendMessage),
  sock(SendEmbed),
  sock(CastRules),
];

export default Sockets;
