import Form from '~/lib/react-structured-form/src/Form';
import Modal from '~/components/common/Modal';
import User from '~/model/User/User';
import UserData from '~/model/User/UserData';
import Profile from '~/model/Profile/Profile';
import UserRepository from '~/repository/User';
interface EditModalProps {
	user: User & { profile: Profile; };
	show: boolean;
	close: () => void;
}
export default function EditModal({ user, show, close }: EditModalProps) {
	async function handleSubmit(values: { name: string, avatar: string, email: string, description: string; }) {
		user.email = values.email;
		user.profile = new Profile({
			...user.profile,
			user_id: user.id,
			name: values.name,
			avatar: values.avatar,
			description: values.description,
		});
		console.log({ values, user });
		const repository = new UserRepository();
		const result = await repository.update(user);
		console.log({result});
		close();
	}
	const properties = [
		{ name: 'id', type: 'hidden', defaultValue: (user.id) },
		{ name: 'name', label: 'Name', type: 'text', defaultValue: user.profile?.name },
		{ name: 'avatar', label: 'Avatar', type: 'url', defaultValue: user.profile?.avatar },
		{ name: 'email', label: 'Email', type: 'email', defaultValue: user.email },
		{ name: 'description', label: 'Description', type: 'textarea', defaultValue: user.profile?.description },
	] as const;
	return (
		<Modal show={show} close={close} className='mx-6 p-4 bg-slate-50 rounded'>
			<Form
				properties={properties}
				actions={[
					{ label: 'Save', onClick: handleSubmit },
					{ label: 'Cancel', onClick: close },
				]}
			/>
		</Modal>
	);
}
