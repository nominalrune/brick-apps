import { type ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";

async function getClientData(request: Request) {
	const response = [
		{
			id: 1,
			name: "App1",
			description: "App1 description",
			icon: "1",
		},
		{
			id: 2,
			name: "App2",
			description: "App2 description",
			icon: "2",
		},
	];
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
		this is app index page
		{
			data.map((app: any) => {
				return <div key={app.id}>
					
					<a href={`/app/${app.id}`}>{app.name}</a>
				</div>;
			})
		}
	</>;
}
