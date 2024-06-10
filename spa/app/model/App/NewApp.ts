import AppBase from './AppBase';

export default class NewApp extends AppBase{

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