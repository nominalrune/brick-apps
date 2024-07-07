import WithoutMethods from '../common/WithoutMethods';
import AppBase from './AppBase';
import AppData from './AppData';
import View from './View/View';
export default class App extends AppBase {
	public default_view: string;
	public defaultView?: View;
	constructor(app: WithoutMethods<App>) {
		super(app);
		this.default_view = app.default_view;
	}
	toJSON(){
		return {
			...super.toJSON(),
			default_view: this.default_view,
			defaultView: this.defaultView?.toJSON(),
		};
	}
	static fromData(data: AppData) {
		return new App({
			name: data.name,
			description: data.description,
			code: data.code,
			icon: data.icon,
			columns: data.columns,
			default_view: data.default_view,
			archived_at: data.archived_at ? new Date(data.archived_at) : null,
		});
	}
}
