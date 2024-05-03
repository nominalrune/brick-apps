import { type ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import api from '~/lib/api';
import { Link } from '@remix-run/react';
export async function clientLoader({
	request,
}: ClientLoaderFunctionArgs) {
	const responseJson = await api('/users', 'GET');
	return responseJson;
}

// export function HydrateFallback() {
// 	return <p>Skeleton rendered during SSR</p>;
// }

export default function Component() {
	const data = useLoaderData();
	return <>
		this is users index page
		<div className='flex m-6 gap-3'>

			{data.map((user) => (
				<Link key={user.id} to={`/users/${user.id}`}>
					<div className="m-3 p-3 flex gap-3 rounded bg-slate-100 hover:bg-slate-50 shadow">
						<img className="size-6 rounded" src={`${user?.profile?.avatar}`} alt="avatar" />
						{user.profile.name}
					</div>
				</Link>
			))}
		</div>
		<details>{JSON.stringify(data)}</details>
	</>;
}
