import NewRecord from '~/model/App/Record/NewRecord';
import Record from '~/model/App/Record/Record';
import RepositoryBase from '../common/RepositoryBase';

export default class RecordRepository extends RepositoryBase<NewRecord, Record> {
	constructor(app_code: string) {
		super(`app/${app_code}`);
	}
	async find(id: number) {
		const data = await super.find(id);
		return Record.fromData(data);
	}
	async getByApp(app: App) {
		const data = await this.request("get", `${this.subUrl}/?app=${app.id}`);
		return data.map((record: any) => Record.fromData(record));
	}
	async create(record: NewRecord) {
		const data = await super.create(record);
		return Record.fromData(data);
	}
	async update(record: Record) {
		const data = await super.update(record);
		return Record.fromData(data);
	}
	async delete(id: number) {
		return await super.delete(id);
	}
}