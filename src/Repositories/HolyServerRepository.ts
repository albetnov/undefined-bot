import BaseRepository from "../Utils/BaseRepository";
import {getCache} from "../Utils/GetCache";

export default class HolyServerRepository extends BaseRepository {
	name = "commands/holy/imgs";

	async getMappedData() {
		const data = await super.get();
		return data.docs.map(item => item.data().value);
	}

	getFromCache() {
		return getCache("holyServer") as unknown as string[];
	}
}