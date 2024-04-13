import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Button from '@/Components/Button';
import AppList from '@/Components/App/AppList';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard({ auth, apps }: PageProps & { apps: any[]; }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex gap-4 items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
                    <div className='flex-grow flex gap-4 justify-end'>
                        <Link href={route('app.create')}><PrimaryButton>New App</PrimaryButton></Link>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <AppList apps={apps} />
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
