import { ClientLoaderFunctionArgs, useLoaderData } from '@remix-run/react';
import User from '~/model/User/User';
import UserRepository from '~/repository/User';
import EditModal from '~/components/User/EditModal';
import { useState } from 'react';
export async function clientLoader({
	params,
}: ClientLoaderFunctionArgs) {
	const id = params.id;
	if(!id) return;
	const userData = await new UserRepository().find(id);
	return User.fromData(userData);
}
export default function Component() {
	const [modalShow, setModalShow] = useState(false);
	const user = useLoaderData<typeof clientLoader>();
	if(!user) return <div>invlid user id</div>;
	return <div className='m-6'>
		<div className='flex gap-3 items-baseline'>
			<img className="size-12 rounded" src={user.profile?.avatar} alt="avatar" />
			<h1 className='text-2xl'>{user.profile?.name}</h1>
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
