import AppIcon from '~/components/App/AppIcon';
import Button from '~/components/common/Button/Button';
import RecordList from '~/components/Record/RecordList';
import { MdSettings } from "@react-icons/all-files/md/MdSettings";
import { type ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import RecordRepository from '~/repository/App/RecordRepository';
import FloatingAddButton from '~/components/common/Button/FloatingAddButton';
import App from '~/model/App/App';
import WithoutMethods from '~/model/common/WithoutMethods';
import { Link } from "@remix-run/react";
import { useContext } from 'react';
import AppContext from '~/contexts/AppContext';
import useAppContext from '~/contexts/useAppContext';

// async function getClientData(code: string) {
// 	const repository = new RecordRepository(code);
// 	const result = await repository.get();
// 	return result;
// }

// export async function clientLoader({
// 	request,
// 	params
// }: ClientLoaderFunctionArgs) {
// 	if (params.code === undefined) { throw new Error('code is required'); }
// 	const clientData = await getClientData(params.code);
// 	return clientData;
// }
export default function Index() {
	// const app = new App(useLoaderData<typeof getClientData>() as WithoutMethods<App>);
	const app = useAppContext();
	return <>
		<div className='flex gap-4 items-center'>
			<AppIcon src={app.icon} />
			<Link to={`/app/${app.code}`} className='text-xl '>{app.name}</Link>
			<div className='flex-grow flex gap-4 justify-end items-center'>
				<Link to={`/app/${app.code}/create`} ><Button>新規作成</Button></Link>
				<Link to={`/apps/${app.code}/edit`} ><MdSettings className="text-3xl text-slate-600 hover:text-slate-800 hover:drop-shadow transition-colors" /></Link>
			</div>
		</div>
		<div className="py-12">
			<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
				<RecordList app={app} />
			</div>
		</div>
		<div className='fixed right-2 bottom-2'>
			<Link to={`/app/${app.code}/create`}>
				<FloatingAddButton />
			</Link>
		</div>
	</>;

}
