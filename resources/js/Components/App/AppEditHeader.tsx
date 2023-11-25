import { AppData } from '@/Models/App/App';
import PrimaryButton from '../PrimaryButton';
import Button from '../Button';
import TextInput from '../TextInput';
import AppIconSelect from './AppIconSelect';

export default function AppEditHeader({ data, submitLabel, onChange, onCancel, onSubmit }: { data: Omit<AppData,"id">, submitLabel:string, onChange: ChangeEventHandler, onCancel: MouseEventHandler, onSubmit: FormEventHandler; }) {
    return <div className='flex gap-4 items-end'>
        <AppIconSelect value={data.icon} name="icon" className='max-w-6' onChange={onChange} />
        <TextInput label="アプリ名" type="text" name="name" className='text-3xl' value={data.name} onChange={onChange} />
        <TextInput label="アプリコード" readOnly={true} type="text" name="code" value={data.code} onChange={onChange} />
        <div className='flex-grow flex gap-4 justify-end'>
            <PrimaryButton type="button" onClick={onSubmit}>{submitLabel}</PrimaryButton>
            <Button type="button" onClick={onCancel}>キャンセル</Button>
        </div>
    </div>;
}
