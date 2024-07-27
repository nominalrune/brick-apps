import AppData from '~/model/App/AppData';

import { FormEventHandler, Fragment } from 'react';
import Input from '../common/Input/Input';
import View from '~/model/App/View/View';

interface Param {
	id: string,
	view: View,
	form: AppData['columns'],
	record: any,
	onSubmit: FormEventHandler,
	edit: boolean,
}

export default function RecordShow({ id, view, record, onSubmit, edit }: Param) {
	return <div className='m-4 flex flex-col gap-6' onSubmit={onSubmit}>
		{
			view.detail.map((inputs, i) => <div key={i} className='flex gap-4'>
				{
					inputs.map(input => <Fragment key={input.code}>
						<Input
							id={input.code}
							label={input.label || "(no name)"}
							type={input.type}
							name={input.code}
							value={record[input.code]}
							className="text-slate-800"
							prefix={input.prefix}
							suffix={input.suffix}
							readOnly={!edit}
						/>
					</Fragment>)
				}</div>)
		}</div>;
}
