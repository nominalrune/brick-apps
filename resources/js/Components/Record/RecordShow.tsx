import { AppData } from '@/Models/App/App';

import { FormEventHandler, Fragment } from 'react';
import Input from '../Input';

interface Param {
    form: AppData["form"],
    record: any,
    onSubmit: FormEventHandler,
    edit: boolean,
}

export default function RecordShow({ form, record, onSubmit, edit }: Param) {
    return <form className='m-4 flex flex-col gap-6' onSubmit={onSubmit}>{
        form.map((inputs, i) => <div key={i} className='flex gap-4'>{
            inputs.map(input => <Fragment key={input.code}>
                <Input
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
    }</form>;
}
