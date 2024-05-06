import Form from '~/lib/react-structured-form/src/Form';
import Modal from '~/components/common/Modal';
import User from '~/model/User/User';
import NewUser from '~/model/User/NewUser';
import UserRepository from '~/repository/User';
import NewProfile from '~/model/Profile/NewProfile';
interface CreateModalProps {
	user: User | NewUser;
	show: boolean;
	close: () => void;
}
export default function CreateModal({ user = NewUser.blank(), show, close }: CreateModalProps) {
	function handleSubmit(values: Record<"name"|"avatar"|"email"|"password"|"description", string>) {
		user.email = values.email;
		user.profile = new NewProfile({
			name: values.name,
			avatar: values.avatar,
			description: values.description,
		});
		const repository = new UserRepository();
		repository.create(user).then((responseJson) => {
			console.log({ responseJson });
			close();
		});
	}
	const properties = [
		{ name: 'name', label: 'Name', type: 'text', defaultValue: user.profile?.name },
		{ name: 'avatar', label: 'Avatar', type: 'url', defaultValue: user.profile?.avatar },
		{ name: 'email', label: 'Email', type: 'email', defaultValue: user.email },
		{ name: 'password', label: 'Password', type: 'password', defaultValue: '' },
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
