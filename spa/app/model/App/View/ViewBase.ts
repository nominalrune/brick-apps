import WithoutMethods from '~/model/common/WithoutMethods';
import DetailLayout from './DetailLayout';
import ListLayout from './ListLayout';
export default class ViewBase {
	public code: string;
	public readonly app_code: string;
	public name: string;
	public description: string;
	public list: ListLayout;
	public detail: DetailLayout;
	constructor(view: WithoutMethods<ViewBase>) {
		this.code = view.code;
		this.name = view.name;
		this.description = view.description;
		this.app_code = view.app_code;
		this.list = new ListLayout(view.list.content);
		this.detail = new DetailLayout(view.detail.content);
	}
	toJSON() {
		return {
			code: this.code,
			name: this.name,
			description: this.description,
			app_code: this.app_code,
			list: this.list.toJSON(),
			detail: this.detail.toJSON(),
		};
	}
}