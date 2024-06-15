import WithoutMethods from '../common/WithoutMethods';
import Columns from './Columns';
import ViewBase from './View/ViewBase';
import AppDetailsLayout from './AppDetailsLayout';
import Widget from './View/Widget';

export default class AppBase {
	public name: string;
	public description: string;
	public code: string;
	public icon: string;
	/** a set of DB columns. can be renamed or removed. Note that removed item just turn to be null and keeps its place in the array */
	public columns: Columns;
	public layout: AppDetailsLayout;
	public archived_at?: Date | null;
	constructor(app: WithoutMethods<AppBase>) {
		this.name = app.name;
		this.description = app.description;
		this.code = app.code;
		this.icon = app.icon;
		this.columns = [...app.columns];
		this.layout = new AppDetailsLayout(app.layout?.content ?? []);
		this.archived_at = app.archived_at ? new Date(app.archived_at) : null;
	}
	toJSON() {
		return {
			name: this.name,
			description: this.description,
			code: this.code,
			icon: this.icon,
			columns: this.columns,
			layout: this.layout.toJSON(),
			archived_at: this.archived_at?.toISOString() ?? null,
		};
	}
}
