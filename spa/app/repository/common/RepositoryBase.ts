import Api from '~/lib/api';
import config from '~/config';

export default class RepositoryBase<T extends { toJSON: () => unknown; }, U extends { id: number | string; toJSON: () => unknown; }> {
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
		return data;
	}
	async update(model: U) {
		const data = await this.api.post(`${this.subUrl}/${model.id}`, model);
		return data;
	}
	async delete(id:number|string){
		return await this.api.delete(`${this.subUrl}/${id}`);
	}
}