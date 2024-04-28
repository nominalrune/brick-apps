import Form from "~/lib/react-structured-form/src/Form";
import { type ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import useAuth from '~/hooks/useAuth';

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
	const {user, login} = useAuth();
	if(user){
		return <div>ログイン済み</div>;
	}
	return (
		<div>
			<Form
				actions={[
					{ "label": "ログイン", onClick: (data) => {login(data.email, data.password) } },
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
