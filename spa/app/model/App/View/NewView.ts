import ViewBase from './ViewBase';
import ViewContent from './ViewContent';

export default class NewView extends ViewBase {
	static blank(initialValue?: Partial<NewView>) {
		return new NewView({
			code: '',
			name: '',
			description: '',
			app_code: '',
			content: new ViewContent([]),
			...initialValue
		});
	}
}