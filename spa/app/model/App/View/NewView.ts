import ViewBase from './ViewBase';
import AppDetailsLayout from '../AppDetailsLayout';

export default class NewView extends ViewBase {
	static blank(initialValue?: Partial<NewView>) {
		return new NewView({
			code: '',
			name: '',
			description: '',
			app_code: '',
			content: new AppDetailsLayout([]),
			...initialValue
		});
	}
}