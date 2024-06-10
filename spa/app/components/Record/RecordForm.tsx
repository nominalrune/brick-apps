import ViewData from '~/model/App/View/ViewData';

import { FormEventHandler, Fragment } from 'react';
import Input from '~/components/common/Input';
import { useState } from 'react';
import NewRecord from '~/model/App/Record/RecordBase';
import Field from '~/model/App/Field';

export default function RecordForm<T extends Field[]>({ id, content, onSubmit }: { id: string, content: ViewData["content"], onSubmit: (record: NewRecord<T>)=>void }) {
	const [record, setRecord] = useState<NewRecord<T>>({} as NewRecord<T>);
	return <form id={id} className='m-4 flex flex-col gap-6' onSubmit={(e)=>{e.preventDefault();onSubmit(record)}}>{
		content.map((inputs, i) => <div key={i} className='flex gap-4'>{
			inputs.map(input => <Fragment key={input.code}>
				<Input
					label={input.label || "(no name)"}
					type={input.type}
					name={input.code}
					defaultValue={input.defaultValue ?? undefined}
					className="text-slate-800"
					prefix={input.prefix}
					suffix={input.suffix}
					onChange={(e) => setRecord({ ...record, [input.code]: e.target.value })}
				/>
			</Fragment>)
		}</div>)
	}</form>;
}
