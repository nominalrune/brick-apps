import { ClientLoaderFunctionArgs, useLoaderData } from '@remix-run/react';
import api from '~/lib/api';
import User from '~/model/User';
import EditModal from '~/components/User/EditModal';
import { useState } from 'react';
export async function clientLoader({
	params,
}: ClientLoaderFunctionArgs) {
	const userData = await api(`/users/${params.id}`, 'GET');
	return User.fromData(userData);
}
export default function Component() {
	const [modalShow, setModalShow] = useState(false);
	const user = useLoaderData<typeof clientLoader>();
	return <div className='m-6'>
		<div className='flex gap-3 items-baseline'>
			<h1 className='text-2xl'>{user.profile?.name}</h1>
			<img className="size-12 rounded" src={user.profile?.avatar} alt="avatar" />
		</div>
		<hr />
		<div className='flex flex-col gap-3 p-3'>
			<div>email: {user.email}</div>
			<div className='flex flex-col gap-3'>
				description:
				<textarea disabled value={user.profile?.description} />
				<button onClick={()=>{setModalShow(true)}}>Edit</button>
				<EditModal user={user.toJSON()} show={modalShow} close={()=>{setModalShow(false)}} />
			</div>
		</div>
	</div>;
}
