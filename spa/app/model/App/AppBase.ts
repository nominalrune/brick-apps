import WithoutMethods from '../common/WithoutMethods';
import Column from './Column';

export default class AppBase {
	public name: string;
	public description: string;
	public code: string;
	public icon: string;
	/** a set of DB columns. can be renamed or removed. Note that removed item just turn to be null and keeps its place in the array */
	public columns: Column[];
	constructor(app: WithoutMethods<AppBase>) {
		this.name = app.name;
		this.description = app.description;
		this.code = app.code;
		this.icon = app.icon;
		this.columns = [...app.columns];
	}
	toJSON() {
		return {
			name: this.name,
			description: this.description,
			code: this.code,
			icon: this.icon,
			columns: this.columns,
		};
	}
}
