import ViewBase from './ViewBase';
import DetailLayout from './DetailLayout';
import ListLayout from './ListLayout';
import Table from './ListLayouts/Table';

export default class NewView extends ViewBase {
	static blank(initialValue?: Partial<NewView>) {
		return new NewView({
			code: 'view',
			name: 'view',
			description: 'view',
			app_code: '',
			list: new ListLayout(new Table([])),
			detail: new DetailLayout([]),
			...initialValue
		});
	}
}