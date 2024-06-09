import WithoutMethods from '../common/WithoutMethods';
import Fields from './FIelds';

export default class AppBase {
	public name: string;
	public description: string;
	public code: string;
	public icon: string;
	/** a set of DB columns. can be renamed or removed. Note that removed item just turn to be null and keeps its place in the array */
	public fields: Fields;
	public archived_at?: Date | null;
	constructor(app: WithoutMethods<AppBase>) {
		this.name = app.name;
		this.description = app.description;
		this.code = app.code;
		this.icon = app.icon;
		this.fields = [...app.fields];
		this.archived_at = app.archived_at ? new Date(app.archived_at) : null;
	}
	toJSON() {
		return {
			name: this.name,
			description: this.description,
			code: this.code,
			icon: this.icon,
			fields: this.fields,
			archived_at: this.archived_at?.toISOString() ?? null,
		};
	}
}
