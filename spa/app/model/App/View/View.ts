import WithoutMethods from '~/model/common/WithoutMethods';
import ViewBase from './ViewBase';
import ViewData from './ViewData';
import DetailLayout from './DetailLayout';
import Widget from './Widget';
import Columns from '../Columns';
import ListLayout from './ListLayout';
export default class View extends ViewBase {
	constructor(view: WithoutMethods<View>) {
		super(view);
	}
	toJSON() {
		return {
			...super.toJSON(),
		};
	}
	static fromData(data: ViewData, columns:Columns) {
		return new View({
			code: data.code,
			app_code: data.app_code,
			name: data.name,
			description: data.description,
			list: new ListLayout(data.list),
			detail: new DetailLayout(data.detail.map(row => row.map(item => Widget.fromData(item, columns)))),
		});
	}
}