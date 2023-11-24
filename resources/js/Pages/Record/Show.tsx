import AppIcon from '@/Components/App/AppIcon';
import Button from '@/Components/Button';
import RecordList from '@/Components/Record/RecordList';
import RecordShow from '@/Components/Record/RecordShow';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AppData } from '@/Models/App/App';
import { RecordData } from '@/Models/Record/Record';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, app, record }: PageProps & { records: RecordData, app: AppData; }) {
    const [isEdit, setIsEdit] = useState(false);
    function edit() { setIsEdit(true); }
    function handleSubmit(){
        setIsEdit(false);
    }
    return <AuthenticatedLayout
        user={auth.user}
        header={
            <div className='flex gap-4 items-center'>
                <AppIcon src={app.icon} />
                <Link href={`/app/${app.code}`} className="text-xl">{app.name}</Link>
                <div className='flex-grow flex gap-4 justify-end'>
                    {!isEdit&&<Button type="button" onClick={() => edit()}>編集</Button>}
                    {isEdit&&<><Button type="button" onClick={handleSubmit}>保存</Button></>}
                </div>
            </div>
        }
    >
        <RecordShow record={record} form={app.form} onSubmit={() => { }} edit={isEdit}/>
    </AuthenticatedLayout>;

}
