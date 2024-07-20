import NewRecord from '~/model/App/Record/RecordBase';
import Record from '~/model/App/Record/Record';
import RepositoryBase from '../common/RepositoryBase';
import App from '~/model/App/App';

export default class RecordRepository extends RepositoryBase<NewRecord, Record> {
	constructor(app_code: string, view_code: string) {
		super(`app/${app_code}/${view_code}`);
	}
	async get(urlParams?: object) {
		return await super.get(urlParams) as App;
	}
	async find(id: number) {
		const data = await super.find(id);
		return data;
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