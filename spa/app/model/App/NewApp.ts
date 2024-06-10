import AppBase from './AppBase';
import NewView from './View/NewView';

export default class NewApp extends AppBase{
	public defaultView?: NewView;
	static blank(){
		return new NewApp({
			name: '',
			description: '',
			code: '',
			icon: '',
			columns: [],
			archived_at: null,
		});
	}
}