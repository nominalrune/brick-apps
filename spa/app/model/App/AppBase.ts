import WithoutMethods from '../common/WithoutMethods';
import Field from './Field';

export default class AppBase {
	public name: string;
	public description: string;
	public code: string;
	public icon: string;
	public fields: Field[];
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
			icon:this.icon,
			fields: this.fields,
			archived_at: this.archived_at?.toISOString() ?? null,
		};
	}
}
