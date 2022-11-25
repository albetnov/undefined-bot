import RefreshCache from "./RefreshCache";
import sock, { KernelableSocket } from "./sock";

const Sockets: KernelableSocket[] = [sock(RefreshCache)];

export default Sockets;
