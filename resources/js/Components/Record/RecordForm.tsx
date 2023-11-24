import { AppData } from '@/Models/App/App';

import { FormEventHandler, Fragment } from 'react';
import TextInput from '../TextInput';

export default function RecordForm({ id,form, onSubmit }: {id:string, form: AppData["form"], onSubmit: FormEventHandler }) {
    return <form id={id} className='m-4 flex flex-col gap-6' onSubmit={onSubmit}>{
        form.map((inputs, i) => <div key={i} className='flex gap-4'>{
            inputs.map(input => <Fragment key={input.code}>
                <TextInput
                    label={input.label || "(no name)"}
                    type={input.type}
                    name={input.code}
                    defaultValue={input.defaultValue}
                    className="text-slate-800"
                    prefix={input.prefix}
                    suffix={input.suffix}
                />
            </Fragment>)
        }</div>)
    }</form>;
}
