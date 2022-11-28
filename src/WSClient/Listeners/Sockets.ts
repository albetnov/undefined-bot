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
];

export default Sockets;
