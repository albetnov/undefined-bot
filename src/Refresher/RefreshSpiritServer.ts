import SpiritServerRepository from "../Repositories/SpiritServerRepository";
import writeToCache from "../Utils/WriteToCache";

export default async function refreshSpiritServer() {
    const spiritServer = await new SpiritServerRepository().get();
    const content = JSON.stringify(spiritServer);
    writeToCache("spiritServer", content);
}