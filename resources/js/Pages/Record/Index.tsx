import AppIcon from '@/Components/App/AppIcon';
import Button from '@/Components/Button';
import PrimaryButton from '@/Components/PrimaryButton';
import RecordList from '@/Components/Record/RecordList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AppData } from '@/Models/App/App';
import { RecordData } from '@/Models/Record/Record';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import { MdSettings } from "react-icons/md";
export default function Index({ auth, app, records }: PageProps & { records: RecordData[], app: AppData; }) {
    return <AuthenticatedLayout
        user={auth.user}
        header={<div className='flex gap-4 items-center'>
            <AppIcon src={app.icon} />
            <Link href={`/app/${app.code}`} className='text-xl '>{app.name}</Link>
            <div className='flex-grow flex gap-4 justify-end items-center'>
                <Link href={`/app/${app.code}/create`} ><PrimaryButton>新規作成</PrimaryButton></Link>
                <Link href={`/app/${app.code}/edit`} ><MdSettings className="text-3xl text-slate-600 hover:text-slate-800 hover:drop-shadow transition-colors" /></Link>
            </div>
        </div>}
        >
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <RecordList records={records} app={app} />
            </div>
        </div>
    </AuthenticatedLayout>;

}
