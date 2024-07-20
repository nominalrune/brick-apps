import { ClientLoaderFunctionArgs, useLoaderData } from '@remix-run/react';
import { Fragment } from 'react/jsx-runtime';
import AppForm from '~/components/App/Edit/Form/AppForm';
import useAppContext from '~/contexts/useAppContext';
import App from '~/model/App/App';
import Record from '~/model/App/Record/Record';
import View from '~/model/App/View/View';
import RecordRepository from '~/repository/App/RecordRepository';

async function getClientData(code: string, view_code: string, record_id: number) {
	const repository = new RecordRepository(code, view_code);
	const result = await repository.find(record_id);
	console.log({ record_id, result });
	return result as { app: App, record: Record; };
}

export async function clientLoader({
	request,
	params
}: ClientLoaderFunctionArgs) {
	if (params.code === undefined) { throw new Error('code is required'); }
	const clientData = await getClientData(params.code, params.view_code ?? '', Number(params.record_id));
	return clientData;
}
export default function Show() {
	const res = useLoaderData<typeof getClientData>();
	const app = res.app as App;
	const record = res.record as Record;
	return <>
		{
			app.view && app.view.detail.map((row, i) => (
				<div key={i} className='flex gap-4 pb-2 border-b '>
					{
						row.map(widget => <div
							key={widget.code}
							className='flex flex-col gap-2'
						>
							{widget.label}
							<div className='ml-1 flex gap-1 items-baseline'>
								{widget.prefix}
								<div className='p-2 border border-slate-300 bg-slate-400/10'>
									{record[widget.code]?.toString()}
								</div>
								{widget.suffix}
							</div>
						</div>)
					}
				</div>
			))
		}

	</>;
}