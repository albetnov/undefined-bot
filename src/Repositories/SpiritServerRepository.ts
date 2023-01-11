import BaseRepository from "../Utils/BaseRepository";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../index";
import {getCache} from "../Utils/GetCache";

interface SpiritServerResult {
	quotes: string[];
	imgUrls: string[];
}

export default class SpiritServerRepository {
	async get() {
		const quotes = await getDocs(collection(db, "commands/spirit/quotes"));
		const imgUrls = await getDocs(collection(db, "commands/spirit/spiritImgs"));

		return {
			quotes: quotes.docs.map(item => item.data().value),
			imgUrls: imgUrls.docs.map(item => item.data().value)
		};
	}

	getFromCache() {
		return getCache("spiritServer") as unknown as SpiritServerResult;
	}
}