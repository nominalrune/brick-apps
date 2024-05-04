import { User } from './../../../../api/resources/js/types/index.d';
import Api from '~/lib/api';
import config from '~/config';
import Url from '~/lib/Url/Url';

export default class RepositoryBase {
	private api: Api;
	constructor(public readonly subUrl: string | URL) {
		this.api = new Api(config.baseUrl);
	}
	async find(id: number | string) {
		const data = await this.api.get(`${this.subUrl}/${id}`);
		return data;
	}
	async get(urlParams: object) {
		const data = await this.api.get(this.subUrl, urlParams);
		return data;
	}
	async create(user: User) {
		const data = await this.api.post(this.subUrl, user);
		return data;
	}
	async update(user: User) {
		const data = await this.api.post(this.subUrl, user);
		return data;
	}
}