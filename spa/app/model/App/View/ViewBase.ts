import WithoutMethods from '~/model/common/WithoutMethods';
import AppDetailsLayout from '../AppDetailsLayout';
export default class ViewBase {
	public code: string;
	public readonly app_code: string;
	public name: string;
	public description: string;
	public layout: AppDetailsLayout;
	constructor(view: WithoutMethods<ViewBase>) {
		this.code = view.code;
		this.name = view.name;
		this.description = view.description;
		this.app_code = view.app_code;
		this.layout = new AppDetailsLayout(view.layout?.content ?? []);
	}
	toJSON() {
		return {
			code: this.code,
			name: this.name,
			description: this.description,
			app_code: this.app_code,
			layout: this.layout.toJSON(),
		};
	}
}