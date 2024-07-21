import App from '~/model/App/App';
import Record from '~/model/App/Record/Record';
import View from '~/model/App/View/View';
import TableList from './List/TableList';
import CalendarList from './List/CalendarList';
import CardsList from './List/CardsList';

interface Prop<T extends App> {
	app: T,
}
export default function RecordList<T extends App & { view: View; }>({ app }: Prop<T>) {
	const records = app.records as Record[] | undefined;
	if (!records || records?.length < 0) {
		return <>まだレコードがありません</>;
	}
	const type = app.view.list.listType;
	switch (type) {
		case 'table': {
			return <TableList records={records} app={app} />;
		}
		case 'cards': {
			return <CardsList records={records} app={app} />;
		}
		case 'calndar': {
			return <CalendarList records={records} app={app} />;
		}
	}

}
