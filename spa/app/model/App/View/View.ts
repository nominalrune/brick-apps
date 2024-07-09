import WithoutMethods from '~/model/common/WithoutMethods';
import ViewBase from './ViewBase';
import ViewData from './ViewData';
import DetailLayout from './DetailLayout';
import Widget from './Widget';
import ListLayout from './ListLayout';
import Column from '../Column';
export default class View extends ViewBase {
	public id: number;
	constructor(view: WithoutMethods<View>) {
		super(view);
		this.id = view.id;
	}
	toJSON() {
		return {
			...super.toJSON(),
			id: this.id,
		};
	}
	static fromData(data: ViewData, columns:Column[]) {
		return new View({
			id: data.id,
			code: data.code,
			app_code: data.app_code,
			name: data.name,
			description: data.description,
			list: new ListLayout(data.list),
			detail: new DetailLayout(data.detail.map(row => row.map(item => Widget.fromData(item, columns)))),
		});
	}
}