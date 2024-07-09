import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, Fragment, FormEventHandler } from 'react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import PrimaryButton from '@/Components/PrimaryButton';
import { AppData } from '@/Models/App/App';
import AppIcon from '@/Components/App/AppIcon';
import RecordForm from '@/Components/Record/RecordForm';

export default function Create({ auth, app }: PageProps & { app: AppData; }) {
    const { data, setData, reset, transform,errors, post, processing } = useForm();
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!confirm("新規レコードを作成しますか？")) { return; }
        const f=new FormData(e.currentTarget)
        const inputs=Object.fromEntries(f.entries());
        transform(data=>({...inputs}));
        post(`/web/${app.code}/create`);
    }
    function handleCancel() {
        window.history.back();
    }
    const id="record-create-form";
    return <AuthenticatedLayout
        user={auth.user}
        header={<div className='flex gap-4 items-center'>
            <AppIcon src={app.icon} />
            <Link href={`/web/${app.code}`} className='text-xl'>{app.name}</Link>
            <span>新規レコード作成</span>
            <div className='flex-grow flex gap-4 justify-end'>
                <PrimaryButton type="submit" form={id}>作成</PrimaryButton>
                <Button type="button" onClick={handleCancel}>キャンセル</Button>
            </div>
        </div>}
    >
        <Head title="create new app" />
        <RecordForm id={id} form={app.form} onSubmit={handleSubmit}/>
    </AuthenticatedLayout>;
}
