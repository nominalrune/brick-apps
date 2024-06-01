import { PageProps } from '~/types';
import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, Fragment, FormEventHandler } from 'react';
import Input from '~/components/common/Input';
import Button from '~/components/common/Button/Button';
import AppData  from '~/model/App/AppData';
import AppIcon from '~/components/App/AppIcon';
import RecordForm from '~/components/Record/RecordForm';
import { MdSettings } from "@react-icons/all-files/md/MdSettings";
import { type ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import RecordRepository from '~/repository/App/RecordRepository';
import FloatingAddButton from '~/components/common/Button/FloatingAddButton';
async function getClientData(code:string) {
	// const repository = new RecordRepository(code);
	// const {records, app} = await repository.index();
	// return {app, records};
}

export async function clientLoader({
	request,
	params
}: ClientLoaderFunctionArgs) {
	// const clientData = await getClientData(params.code);
	// return clientData;
}
export default function Create({ app }: { app: AppData; }) {
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
