import writeToCache from "../Utils/WriteToCache";
import HolyServerRepository from "../Repositories/HolyServerRepository";

export default async function refreshHolyServer() {
    const holyServer = await new HolyServerRepository().getMappedData();
    const content = JSON.stringify(holyServer);
    writeToCache("holyServer", content);
}