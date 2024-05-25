import NewRecord from '~/model/App/Record/RecordBase';
import Record from '~/model/App/Record/Record';
import RepositoryBase from '../common/RepositoryBase';
import App from '~/model/App/App';

export default class RecordRepository extends RepositoryBase<NewRecord, Record> {
	constructor(app_code: string) {
		super(`app/${app_code}`);
	}
	async index() {
		const data = await this.request("get", this.subUrl);
		return data;
	}
	async find(id: number) {
		const data = await super.find(id);
		return data;
	}
	async getByApp(app: App) {
		const data = await this.request("get", `${this.subUrl}/?app=${app.id}`);
		return data.map((record: any) =>record);
	}
	async create(record: NewRecord) {
		const data = await super.create(record);
		return data;
	}
	async update(record: Record) {
		const data = await super.update(record);
		return data;
	}
	async delete(id: number) {
		return await super.delete(id);
	}
}