import App from '~/model/App/App';
import ShowWidget from './ShowWidget';

interface Param {
	app: App,
	record: any,
}
export default function ShowRecord({ app, record }: Param) {
	if (!app.view) return <></>;
	return <> {
		app.view.detail.map((row, i) => (
			<div key={i} className='flex gap-4 pb-2 border-b '>
				{row.map(widget => <ShowWidget
					key={widget.code}
					widget={widget}
					record={record}
				/>)}
			</div>
		))
	} </>;
}