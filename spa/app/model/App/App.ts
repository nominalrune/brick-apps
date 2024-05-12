import WithoutMethods from '../common/WithoutMethods';
import AppBase from './AppBase';
import AppData from './AppData';
// import View from './View/View';
export default class App extends AppBase {
	public readonly id: number;
	public created_at: Date;
	public updated_at: Date;
	public defaultViewCode: string;
	constructor(app: WithoutMethods<App>) {
		super(app);
		this.created_at = new Date(app.created_at);
		this.updated_at = new Date(app.updated_at);
		this.id = app.id;
		this.defaultViewCode = app.defaultViewCode;
	}
	static fromData(data: AppData) {
		return new App({
			id: data.id,
			name: data.name,
			description: data.description,
			code: data.code,
			icon: data.icon,
			fields: data.fields,
			// defaultView: View.fromData(data.defaultView),
			defaultViewCode: data.defaultViewCode,
			created_at: new Date(data.created_at),
			updated_at: new Date(data.updated_at),
			archived_at: data.archived_at ? new Date(data.archived_at) : null,
		});
	}
}
