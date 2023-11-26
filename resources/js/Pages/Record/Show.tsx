import AppIcon from '@/Components/App/AppIcon';
import Button from '@/Components/Button';
import RecordList from '@/Components/Record/RecordList';
import RecordShow from '@/Components/Record/RecordShow';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AppData } from '@/Models/App/App';
import { RecordData } from '@/Models/Record/Record';
import { PageProps } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { MdDelete } from "react-icons/md";

export default function Show({ auth, app, record }: PageProps & { record: RecordData, app: AppData; }) {
    const [isEdit, setIsEdit] = useState(false);
    function edit() { setIsEdit(true); }
    const { transform, post, errors, delete: destroy } = useForm();
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.target;
        if (!(form instanceof HTMLFormElement)) { return; }
        const formData = Object.fromEntries(new FormData(form).entries());
        transform(data => formData);
        post(`/web/${app.code}/edit`, { onSuccess: (e) => { setIsEdit(false); } });
    }
    function handleDelete() {
        if (!confirm("本当に削除しますか？")) { return; }
        destroy(`/web/${app.code}/${record.id}`);
    }
    return <AuthenticatedLayout
        user={auth.user}
        header={
            <div className='flex gap-4 items-center'>
                <AppIcon src={app.icon} />
                <Link href={`/web/${app.code}`} className="text-xl">{app.name}</Link>
                <div className='flex-grow flex gap-4 justify-end'>
                    {!isEdit && <Button type="button" onClick={() => edit()}>編集</Button>}
                    {isEdit && <Button type="submit" form={record.id.toString()}>保存</Button>}
                    <Button className="text-white bg-red-400 hover:bg-red-300 hover:box-shadow" onClick={handleDelete}><MdDelete/>削除</Button>
                </div>
            </div>
        }
    >
        {errors && <>{Object.entries(errors).map(([key, value]) => <div key={key} className="text-red-600">{key}:{value}</div>)}</>}
        <RecordShow id={record.id.toString()} record={record} form={app.form} onSubmit={handleSubmit} edit={isEdit} />
    </AuthenticatedLayout>;
}
