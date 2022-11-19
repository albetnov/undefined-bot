import ScheduleRepository from "../Repositories/ScheduleRepository";
import BaseRealtimeRepository from "../Utils/BaseRealTimeRepo";

const loader: BaseRealtimeRepository[] = [new ScheduleRepository()];

export default loader;
