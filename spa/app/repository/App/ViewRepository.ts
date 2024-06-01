import NewView from '~/model/App/View/ViewBase';
import View from '~/model/App/View/View';
import RepositoryBase from '../common/RepositoryBase';
import App from '~/model/App/App';

export default class ViewRepository extends RepositoryBase<NewView, View> {
	constructor(
		private app_code: string
	) {
		super(`views/${app_code}`);
	}
	async index() {
		const data = await this.request("get", this.subUrl);
		return data;
	}
	async find(id: number) {
		const data = await super.find(id);
		return data;
	}
	async create(View: NewView) {
		const data = await super.create(View);
		return data;
	}
	async update(View: View) {
		const data = await super.update(View);
		return data;
	}
	async delete(id: number) {
		return await super.delete(id);
	}
}