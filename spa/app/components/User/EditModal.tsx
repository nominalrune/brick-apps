import Form from '~/lib/react-structured-form/src/Form';
import Modal from '~/components/common/Modal';
import User from '~/model/User/User';
import NewUser from '~/model/User/NewUser';
interface EditModalProps {
	user: User | NewUser;
	show: boolean;
	close: () => void;
}
export default function EditModal({ user = User.blank(), show, close }: EditModalProps) {
	function handleSubmit(values:WithoutId<UserData>) {
		console.log({ values });
	}
	const properties = ([
		("id" in user ? { name: 'id', type: 'hidden', defaultValue: (user.id) } as const : null),
		{ name: 'name', label: 'Name', type: 'text', defaultValue: user.profile?.name },
		{ name: 'avatar', label: 'Avatar', type: 'url', defaultValue: user.profile?.avatar },
		{ name: 'email', label: 'Email', type: 'email', defaultValue: user.email },
		("id" in user ? null : { name: 'password', label: 'Password', type: ("id" in user ? "hidden" : "password"), defaultValue: '' } as const),
		{ name: 'description', label: 'Description', type: 'textarea', defaultValue: user.profile?.description },
	] as const).filter((item):item is Exclude<typeof item, null>=>!!item);
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
