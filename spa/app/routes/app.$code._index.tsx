import AppIcon from '~/components/App/AppIcon';
import Button from '~/components/common/Button/Button';
import RecordList from '~/components/Record/RecordList';
// import { AppData } from '@/Models/App/App';
// import { RecordData } from '@/Models/Record/Record';
// import { PageProps } from '@/types';
// import { a } from '@inertiajs/react';
import { MdSettings } from "@react-icons/all-files/md/MdSettings";
import { type ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import AppRepository from '~/repository/App';
async function getClientData(code:string) {
	const repository = new AppRepository();
	const app = await repository.findByCode(code);
}

export async function clientLoader({
	request,
	params
}: ClientLoaderFunctionArgs) {
	const clientData = await getClientData(params.code);
	return clientData;
}
export default function Index() {
	const {app, records} = useLoaderData();
	return <>
	<div className='flex gap-4 items-center'>
            <AppIcon src={app.icon} />
            <a href={`/web/${app.code}`} className='text-xl '>{app.name}</a>
            <div className='flex-grow flex gap-4 justify-end items-center'>
                <a href={`/app/${app.code}/create`} ><Button>新規作成</Button></a>
                <a href={`/app/${app.code}/edit`} ><MdSettings className="text-3xl text-slate-600 hover:text-slate-800 hover:drop-shadow transition-colors" /></a>
            </div>
        </div>
    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <RecordList records={records} app={app} />
        </div>
    </div>
	</>
    // return <AuthenticatedLayout
    //     user={auth.user}
    //     header={}
    //     >
    // </AuthenticatedLayout>;

}
