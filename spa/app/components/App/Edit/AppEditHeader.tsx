import AppBase from '~/model/App/AppBase';
import Button from '../../common/Button/Button';
import Input from '../../common/Input';
import AppIconSelect from './AppIconSelect';
import type { ChangeEventHandler, FormEventHandler, MouseEventHandler } from 'react';
import { MdDelete } from '@react-icons/all-files/md/MdDelete';

export default function AppEditHeader({ data, submitLabel, onChange, onCancel, onSubmit, onDelete }: { data: AppBase, submitLabel:string, onChange: ChangeEventHandler, onCancel: MouseEventHandler, onSubmit: FormEventHandler, onDelete: MouseEventHandler }) {
    return <div className='bg-slate-200 p-3 flex gap-4 items-end'>
        <AppIconSelect value={data.icon} name="icon" label="アイコン" onChange={onChange} />
        <Input label="アプリ名" type="text" name="name" className='min-w-56' id={"name"} value={data.name} onChange={onChange} />
        <Input label={<div className='text-slate-500 text-sm'>アプリコード</div>} required type="text" name="code" id='code' value={data.code} onChange={onChange} />
        <div className='flex-grow flex gap-4 justify-end text-nowrap'>
            <Button type="button" onClick={onSubmit}>{submitLabel}</Button>
            <Button type="button" onClick={onCancel}>キャンセル</Button>
            <Button className="pl-2 pr-2 text-white bg-red-600 hover:bg-red-500 hover:box-shadow" onClick={onDelete}><MdDelete className="text-xl" title="削除"/></Button>
        </div>
    </div>;
}
