import { type ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import AppList from '~/components/App/AppList';
import AppRepository from '~/repository/App';
async function getClientData(request: Request) {
	const repository = new AppRepository();
	return await repository.get();
}

export async function clientLoader({
	request,
}: ClientLoaderFunctionArgs) {
	const clientData = await getClientData(request);
	return clientData;
}

// export function HydrateFallback() {
// 	return <p>Skeleton rendered during SSR</p>;
// }

export default function Component() {
	const data = useLoaderData();
	return <>
		<AppList apps={data} />
	</>;
}
