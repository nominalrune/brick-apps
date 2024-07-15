import ViewData from '~/model/App/View/ViewData';

import { FormEvent, FormEventHandler, Fragment } from 'react';
import Input from '~/components/common/Input';
import { useState } from 'react';
import NewRecord from '~/model/App/Record/RecordBase';
import Column from '~/model/App/Column';
import useRecord from '~/hooks/App/useRecord';
import Record from '~/model/App/Record/Record';
import DetailLayout from '~/model/App/View/DetailLayout';
import WidgetComponent from '../Widget/WidgetComponent';
import PrimaryButton from '~/components/common/Button/PrimaryButton';
import SecondaryButton from '~/components/common/Button/SecondaryButton';
import useAppContext from '~/contexts/useAppContext';

export default function RecordForm<T extends Column[]>({ layout, record: _record, beforeSubmit, afterSubmit }: { layout: DetailLayout, record: Record, beforeSubmit?: (record: NewRecord<T>) => { result: boolean, message: string | undefined; }; afterSubmit?: (record: Record, error?: { message: string; }) => void; }) {
	const app = useAppContext();
	const { record, errors, message, processing, submit, update } = useRecord(_record, app);
	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (processing) return;
		if (errors.length > 0) return;
		let result = true;
		if (beforeSubmit) {
			const { result: res } = beforeSubmit(record);
			result = res;
		}
		if (!result) return;
		await submit();
		if (!afterSubmit) return;
		if (message) { return afterSubmit(record, { message }); }
		console.log('after submit', { record });
		return afterSubmit(record);
	}
	return <form className='m-4 flex flex-col gap-6' onSubmit={handleSubmit}>
		{
			layout.map((row, i) => <div key={i} className='flex gap-4'>{
				row.map(widget => <Fragment key={widget.code}>
					<WidgetComponent
						value={record[widget.code]}
						widget={widget}
						onChange={(value) => update(widget.code, value)}
					/>
				</Fragment>)
			}</div>)
		}
		<div className='flex justify-end gap-2'>
			<PrimaryButton type='submit' disabled={processing || errors?.length > 0}>Save</PrimaryButton>
			<SecondaryButton type='button' onClick={() => { }}>Cancel</SecondaryButton>
		</div>
	</form>;
}
