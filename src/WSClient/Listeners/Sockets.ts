import ChannelList from "./ChannelList";
import RefreshCache from "./RefreshCache";
import sock, { KernelableSocket } from "./sock";

const Sockets: KernelableSocket[] = [sock(RefreshCache), sock(ChannelList)];

export default Sockets;
