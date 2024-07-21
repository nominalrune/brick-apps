import { Link } from '@remix-run/react';
import App from '~/model/App/App';
import Record from '~/model/App/Record/Record';
import ListLayout from '~/model/App/View/ListLayout';
import Table from '~/model/App/View/ListLayouts/Table';
import View from '~/model/App/View/View';

interface Prop {
	records: Record[],
	app: App &{view:{list:Table}},
}
export default function TableList({ records, app }: Prop) {
	const layout = new Table(app.view.list);
	return <>
		<table className="rounded border-separate border-spacing-0">
			<thead className="bg-sky-600 text-white">
				<tr>
					{layout.content.map(item => <th
						key={item.code}
						className="p-2 first:rounded-tl last:rounded-tr"
					>
						{item.label}
					</th>)}
				</tr>
			</thead>
			<tbody>
				{records.map((record: Record) => (
					<tr key={record.id} className='hover:bg-sky-400/10 group'>
						{layout.content.map(widget => (<>
							<td key={record.id + widget.code} className='p-2 border border-t-0 border-slate-200 group-last:first:rounded-bl group-last:last:rounded-br'>
								<Link to={`/app/${app.code}/${app.view?.code}/${record.id}`}>
									{widget.prefix}
									{record[widget.column.code]?.toString()}
									{widget.suffix}
								</Link>
							</td>
						</>))
						}
					</tr>
				))
				}
			</tbody>
		</table>
	</>;


}