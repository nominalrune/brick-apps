import WithoutMethods from '../common/WithoutMethods';
import AppBase from './AppBase';
import NewView from './View/NewView';

export default class NewApp extends AppBase {
	public view: NewView;
	constructor(app: WithoutMethods<NewApp>) {
		super(app);
		this.view = new NewView(app.view);
	}
	toJSON() {
		return {
			...super.toJSON(),
			view: this.view.toJSON(),
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
			view: NewView.blank(),
		});
	}
}