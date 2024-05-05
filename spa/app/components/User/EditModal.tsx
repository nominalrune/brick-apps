import Form from '~/lib/react-structured-form/src/Form';
import Modal from '~/components/common/Modal';
import User from '~/model/User/User';
import UserWithoutId from '~/model/User/UserWithoutId';
interface EditModalProps {
	user: User | UserWithoutId;
	show: boolean;
	close: () => void;
}
export default function EditModal({ user = User.blank(), show, close }: EditModalProps) {
	function handleSubmit(values) {
		console.log({ values });
	}
	return (
		<Modal show={show} close={close} className='mx-6 p-4 bg-slate-50 rounded'>
			<Form
				properties={[
					{ name: 'id', type: 'hidden', defaultValue: user?.id },
					{ name: 'name', label: 'Name', type: 'text', defaultValue: user.profile?.name },
					{ name: 'avatar', label: 'Avatar', type: 'url', defaultValue: user.profile?.avatar },
					{ name: 'email', label: 'Email', type: 'email', defaultValue: user.email },
					{ name: 'description', label: 'Description', type: 'textarea', defaultValue: user.profile?.description },
				]}
				actions={[
					{ label: 'Save', onClick: handleSubmit },
					{ label: 'Cancel', onClick: close },
				]}
			/>
		</Modal>
	);
}
