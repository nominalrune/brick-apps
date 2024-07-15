import Form from "~/lib/react-structured-form/src/Form";
import { type ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import { useContext } from 'react';
import AuthContext from '~/contexts/Auth/AuthContext';


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

// export const clientAction = async ({
// 	request,
// 	params,
// 	serverAction,
// }: ClientActionFunctionArgs) => {
// 	invalidateClientSideCache();
// 	const data = await serverAction();
// 	return data;
// };

export default function Login() {
	const {user, login} = useContext(AuthContext);
	if(user){
		return <div>ログイン済み</div>;
	}
	return (
		<div className='max-w-md mx-auto my-8 p-4 rounded border border-slate-500 '>
			<Form
				actions={[
					{ "label": "ログイン", onClick: (data) => {login(data) } },
					{ "label": "キャンセル", onClick: () => { console.log("cancel"); } },
				]}
				properties={[
					{ "name": "email", "label": "メールアドレス", "type": "email", "required": true },
					{ "name": "password", "label": "パスワード", "type": "password", "required": true },
				]}
			/>
		</div>
	);
}
