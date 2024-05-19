import AppData from '~/model/App/AppData';
import Record from '~/model/App/Record/Record';
import { Fragment } from 'react';
import { Link } from '@remix-run/react';

interface Prop<T extends AppData> {
    app:T,
    records: Record<T["fields"]>[];
}
export default function RecordList<T extends AppData>({ records, app }: Prop<T>) {
    if (records.length === 0) {
        return <>まだレコードがありません</>;
    }
    const columns = app.fields as T["fields"];
    return <>
        <table className="rounded border-separate border-spacing-0">
            <thead className="bg-sky-600 text-white">
                <tr>
                    {columns.map(column => <th key={column.code} className="p-2 first:rounded-tl last:rounded-tr">
						{column.code}
						</th>)}
                </tr>
            </thead>
            <tbody>
                {records.map(record => (
                    <tr key={record.id} className='h hover:bg-sky-400/10 group'>
                        {columns.map(column => (
                            <td key={record.id + column.code} className='p-2 border-[1px] border-t-0 border-slate-200 group-last:first:rounded-bl group-last:last:rounded-br'>
                                <Link to={`/app/${app.code}/${record.id}`}>{record[column.code]}</Link>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </>;

}
