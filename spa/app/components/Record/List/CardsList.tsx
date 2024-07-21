import { Link } from '@remix-run/react';
import App from '~/model/App/App';
import Record from '~/model/App/Record/Record';
import ListLayout from '~/model/App/View/ListLayout';
import Cards from '~/model/App/View/ListLayouts/Cards';
import Table from '~/model/App/View/ListLayouts/Table';
import View from '~/model/App/View/View';

interface Prop {
	records: Record[],
	app: App & { view: { list: Cards; }; },
}
export default function CardsList({ records, app }: Prop) {
	const layout = new Cards(app.view.list);
	return <>
		<div className="grid">
			{records.map((record) => (
				<div key={record.id} className='rounded bg-white shadow hover:bg-slate-400/10 group'>
					{layout.content.map((row, i) => (<div key={i} className='flex flex-col gap-1'>{
						row.map(widget => {
							const body = <div>{widget.prefix}
								{record[widget.column.code]?.toString()}
								{widget.suffix}</div>;
							if (widget.column.code === 'id') { return <Link key={record.id + widget.code} to={`/app/${app.code}/${app.view?.code}/${record.id}`}>{body}</Link>; }
							return <div key={record.id + widget.code} className='p-2 border border-t-0 border-slate-200 group-last:first:rounded-bl group-last:last:rounded-br'>
								{body}
							</div>;
						})
					}</div>))
					}
				</div>
			))
			}
		</div>
	</>;


}