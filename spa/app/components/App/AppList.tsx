import AppData from '~/model/App/AppData';
import AppIcon from './AppIcon';

export default function AppList({ apps }: { apps: AppData[]; }) {
	return <table className="rounded-lg">
		<thead className="bg-slate-200">
			<tr>
				<th className="p-2 rounded-tl-lg" title='app icon'></th>
				<th className="p-2" title="app name">name</th>
				<th className="p-2" title="app description">description</th>
				<th className="p-2 rounded-tr-lg" title="app statistics">statistics</th>
			</tr>
		</thead>
		<tbody>
			{apps.length === 0 ? <>まだアプリはありません</> : apps.map(app => <AppListItem app={app} key={app.code} />)}
		</tbody>
	</table>;
}

function AppListItem({ app }: { app: AppData; }) {
	const link=`/app/${app.code}/${app.default_view}`;
	return <tr className='hover:bg-sky-100 group'>
		<td className="p-2 group-last:rounded-bl-lg border-[1px] border-r-0" ><a href={link}><AppIcon className='w-16 h-16' src={app.icon} /></a></td>
		<td className="p-2 text-xl border-b-[1px]" ><a href={link}>{app.name}</a></td>
		<td className='p-2 w-max border-b-[1px]'>{app.description}</td>
		<td className="p-2 group-last:rounded-br-lg border-[1px] border-l-0">records:<span className='p-1'>{42}</span></td>
	</tr>;
}
