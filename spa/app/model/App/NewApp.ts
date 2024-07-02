import WithoutMethods from '../common/WithoutMethods';
import AppBase from './AppBase';
import NewView from './View/NewView';

export default class NewApp extends AppBase {
	public defaultView: NewView;
	constructor(app: WithoutMethods<NewApp> & { defaultView: NewView; }) {
		super(app);
		this.defaultView = app.defaultView;
	}
	toJSON() {
		return {
			...super.toJSON(),
			defaultView: this.defaultView.toJSON(),
		};
	}
	static blank() {
		return new NewApp({
			name: '',
			description: '',
			code: '',
			icon: '',
			columns: [],
			archived_at: null,
			defaultView: NewView.blank(),
		});
	}
}