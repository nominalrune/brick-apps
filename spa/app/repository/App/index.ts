import App from '~/model/App/App';
import RepositoryBase from '../common/RepositoryBase';
import NewApp from '~/model/App/NewApp';
import NewView from '~/model/App/View/NewView';
import View from '~/model/App/View/View';

interface getOptions {
	with?: {
		view?: boolean;
		records?: boolean;
	};
	filter?: {
		[key: string]: string | number;
	};
}

export default class AppRepository extends RepositoryBase<NewApp, App> {
	constructor() {
		super('apps');
	}
	async get(options?: getOptions) {
		const data = await super.get(options);
		return data.map((app: any) => App.fromData(app));
	}

	async find(id: number, options?: getOptions) {
		const data = await super.find(id);
		return App.fromData(data);
	}
	async findByCode(code: string, options?: getOptions) {
		const data = await this.request("get", `${this.subUrl}?code=${code}`);
		return App.fromData(data);
	}
	async createWithView(app: NewApp, view: NewView) {
		const data = await super.create(new NewApp({...app, defaultView: view}));
		return App.fromData(data);
	}
	async update(app: App) {
		const data = await super.update(app);
		return App.fromData(data);
	}
	async updateWithView(app: App, view: View) {
		const data = await super.update(new App({...app, defaultView: view}));
		return App.fromData(data);
	}
	async archive(id: number) {
		return await this.api.get(`${this.subUrl}/${id}/archive`);
	}
	async delete(id: number) {
		return await super.delete(id);
	}
}