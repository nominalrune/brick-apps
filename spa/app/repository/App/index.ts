import App from '~/model/App/App';
import RepositoryBase from '../common/RepositoryBase';
import NewApp from '~/model/App/NewApp';
import NewView from '~/model/App/View/NewView';

interface getOptions {
	with?: {
		view?: boolean;
		records?: boolean;
	};
	filter?: {
		[key: string]: string | number;
	};
}

export default class AppRepository extends RepositoryBase<NewApp & { view: NewView; }, App> {
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
		const data = await super.create({
			...app, view, toJSON: () => ({
				...app.toJSON(),
				view: view.toJSON(),
			})
		});
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