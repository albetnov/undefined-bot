import ScheduleRepository from "../Repositories/ScheduleRepository";
import SettingsRepository from "../Repositories/SettingsRepository";
import BaseRealtimeRepository from "../Utils/BaseRealTimeRepo";

const loader: BaseRealtimeRepository[] = [new ScheduleRepository(), new SettingsRepository()];

export default loader;
