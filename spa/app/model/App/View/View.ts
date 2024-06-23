import WithoutMethods from '~/model/common/WithoutMethods';
import ViewBase from './ViewBase';
import ViewData from './ViewData';
import DetailLayout from './DetailLayout';
import Widget from './Widget';
import Columns from '../Columns';
import ListLayout from './ListLayout';
export default class View extends ViewBase {
	public readonly id: number;
	public readonly created_at: Date;
	public readonly updated_at: Date;
	constructor(view: WithoutMethods<View>) {
		super(view);
		this.id = view.id;
		this.created_at = new Date(view.created_at);
		this.updated_at = new Date(view.updated_at);
	}
	toJSON() {
		return {
			...super.toJSON(),
			id: this.id,
			created_at: this.created_at,
			updated_at: this.updated_at,
		};
	}
	static fromData(data: ViewData, columns:Columns) {
		return new View({
			id: data.id,
			code: data.code,
			app_code: data.app_code,
			name: data.name,
			description: data.description,
			list: new ListLayout(data.list.map(item => Widget.fromData(item, columns))),
			detail: new DetailLayout(data.content.map(row => row.map(item => Widget.fromData(item, columns)))),
			created_at: new Date(data.created_at),
			updated_at: new Date(data.updated_at),
		});
	}
}