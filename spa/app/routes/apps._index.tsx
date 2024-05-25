import { type ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import AppList from '~/components/App/AppList';
import FloatingAddButton from '~/components/common/Button/FloatingAddButton';
import AppRepository from '~/repository/App';
import { useNavigate } from "@remix-run/react";

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
	const navigate = useNavigate();
	return <>
		<div className='mx-6 gap-4 items-center'>
			<div className='m-1 flex justify-end'>
			<FloatingAddButton onClick={() => {navigate("./create")}} className="w-12 h-12 text-3xl" />
				
			</div>
			<AppList apps={data} />
		</div>
	</>;
}
