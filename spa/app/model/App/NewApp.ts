import AppBase from './AppBase';

export default class NewApp extends AppBase{

	static blank(){
		return new NewApp({
			name: '',
			description: '',
			code: '',
			icon: '',
			fields: [],
			archived_at: null,
		});
	}
}