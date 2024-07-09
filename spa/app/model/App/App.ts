import WithoutMethods from '../common/WithoutMethods';
import AppBase from './AppBase';
import AppData from './AppData';
import AppDataWithViewAndRecords from './AppDataWIthViewAndRecords';
import View from './View/View';
import Record from './Record/Record';
import ViewData from './View/ViewData';
import { is } from 'typia';
export default class App extends AppBase {
	public id: number;
	public default_view: string;
	public view?: View;
	public records?: Record[];
	public archived_at?: Date | null;
	constructor(app: WithoutMethods<App>) {
		super(app);
		this.id = app.id;
		this.default_view = app.default_view;
		this.view = app.view;
		this.records = app.records;
		this.archived_at = app.archived_at ? new Date(app.archived_at) : null;
	}
	toJSON() {
		return {
			...super.toJSON(),
			id: this.id,
			default_view: this.default_view,
			view: this.view?.toJSON(),
			records: this.records,
			archived_at: this.archived_at,
		};
	}
	static fromData(data: AppData | AppDataWithViewAndRecords) {
		return new App({
			id: data.id,
			name: data.name,
			description: data.description,
			code: data.code,
			icon: data.icon,
			columns: data.columns,
			default_view: data.default_view,
			archived_at: data.archived_at,
			view: is<{ view: ViewData; }>(data) ? View.fromData(data.view, data.columns) : undefined,
			records: is<{ records: Record[]; }>(data) ? data.records : undefined,
		});
	}
}
