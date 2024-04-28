import { type ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";

async function getClientData(request: Request) {
	const response = {};
	return response;
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
		this is users index page
	</>;
}
