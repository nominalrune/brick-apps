import Api from '~/lib/api';
import config from '~/config';
import Url from '~/lib/Url/Url';

export default class RepositoryBase<T extends { toJSON: () => unknown; }> {
	private api: Api;
	constructor(public readonly subUrl: string | URL) {
		this.api = new Api(config.baseUrl);
	}
	async find(id: number | string) {
		const data = await this.api.get(`${this.subUrl}/${id}`);
		return data;
	}
	async get(urlParams?: object) {
		const data = await this.api.get(this.subUrl, urlParams);
		return data;
	}
	async create(model: T) {
		const data = await this.api.post(this.subUrl, model);
		return model;
	}
	async update(model: T) {
		const data = await this.api.post(`${this.subUrl}/${model.id}`, model);
		return data;
	}
}