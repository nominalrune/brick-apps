import WithoutMethods from '../common/WithoutMethods';
import AppBase from './AppBase';
import AppData from './AppData';
import View from './View/View';
import AppDetailsLayout from './AppDetailsLayout';
export default class App extends AppBase {
	public readonly id: number;
	public created_at: Date;
	public updated_at: Date;
	public defaultViewCode: string;
	public defaultView?: View;
	constructor(app: WithoutMethods<App>) {
		super(app);
		this.created_at = new Date(app.created_at);
		this.updated_at = new Date(app.updated_at);
		this.id = app.id;
		this.defaultViewCode = app.defaultViewCode;
	}
	toJSON(){
		return {
			...super.toJSON(),
			id: this.id,
			created_at: this.created_at.toISOString(),
			updated_at: this.updated_at.toISOString(),
			defaultViewCode: this.defaultViewCode,
			defaultView: this.defaultView?.toJSON(),
		};
	}
	static fromData(data: AppData) {
		return new App({
			id: data.id,
			name: data.name,
			description: data.description,
			code: data.code,
			icon: data.icon,
			columns: data.columns,
			layout: new AppDetailsLayout(data.layout),
			// defaultView: View.fromData(data.defaultView),
			defaultViewCode: data.defaultViewCode,
			created_at: new Date(data.created_at),
			updated_at: new Date(data.updated_at),
			archived_at: data.archived_at ? new Date(data.archived_at) : null,
		});
	}
}
