import App from '~/model/App/App';
import RepositoryBase from '../common/RepositoryBase';
import NewApp from '~/model/App/NewApp';

export default class AppRepository extends RepositoryBase<NewApp, App> {
	constructor() {
		super('apps');
	}
	async find(id: number) {
		const data = await super.find(id);
		return App.fromData(data);
	}
	async findByCode(code:string){
		const data = await this.request("get",`${this.subUrl}/?code=${code}`)
		return App.fromData(data);

	}
	async get() {
		const data = await super.get();
		return data.map((app: any) => App.fromData(app));
	}
	async create(app: NewApp) {
		const data = await super.create(app);
		return App.fromData(data);
	}
	async update(app: App) {
		const data = await super.update(app);
		return App.fromData(data);
	}
	async archive(id: number) {
		return await this.api.get(`${this.subUrl}/${id}/archive`);
	}
	async delete(id: number) {
		return await super.delete(id);
	}
}