import { AppData } from '@/Models/App/App';
import { RecordData } from '@/Models/Record/Record';
import { RecordMetaData } from '@/Models/Record/RecordMeta';
import { Link } from '@inertiajs/react';
import { Fragment } from 'react';

interface Prop {
    records: RecordData[];
    app:AppData
}
export default function RecordList({ records, app }: Prop) {
    if (records.length === 0) {
        return <>まだレコードがありません</>;
    }
    const columns = app.form_keys;
    return <>
        <table className="rounded border-separate border-spacing-0">
            <thead className="bg-sky-600 text-white">
                <tr>
                    {columns.map(column => <th key={column} className="p-2 first:rounded-tl last:rounded-tr">{app.form.flat().find(item => item.code === column)?.label ?? ""}</th>)}
                </tr>
            </thead>
            <tbody>
                {records.map(record => (
                    <tr key={record.id} className='h hover:bg-sky-400/10 group'>
                        {columns.map(column => (
                            <td key={record.id + column} className='p-2 border-[1px] border-t-0 border-slate-200 group-last:first:rounded-bl group-last:last:rounded-br'>
                                <Link href={`/web/${app.code}/${record.id}`}>{record[column]}</Link>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </>;

}
