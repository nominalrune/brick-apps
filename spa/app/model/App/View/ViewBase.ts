import WithoutMethods from '~/model/common/WithoutMethods';
import ViewContent from './ViewContent';
export default class ViewBase {
	public code: string;
	public readonly app_code: string;
	public name: string;
	public description: string;
	public content: ViewContent;
	constructor(view: WithoutMethods<ViewBase>) {
		this.code = view.code;
		this.name = view.name;
		this.description = view.description;
		this.app_code = view.app_code;
		this.content = view.content;
	}
	toJSON() {
		return {
			code: this.code,
			name: this.name,
			description: this.description,
			app_code: this.app_code,
			content: this.content.toJSON(),
		};
	}
}