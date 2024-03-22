import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function Index({ auth, apps }: PageProps & { apps: any[]; }) {
    return <AuthenticatedLayout
        user={auth.user}
        header={<div className='flex gap-4 items-end'></div>}>
        {apps.map(app => <div key={app.id}><a href={`/app/${app.code}`}>{app.name}</a></div>)}
    </AuthenticatedLayout>;

}
