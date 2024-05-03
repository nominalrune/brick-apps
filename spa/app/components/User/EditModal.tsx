import { useState, Fragment } from 'react';
import Form from '~/lib/react-structured-form/src/Form';
import Modal from '~/components/common/Modal';
import User from '~/model/User';

import UserData from '~/model/UserData';
interface EditModalProps {
	user: UserData;
	show:boolean;
	close:()=>void;
}
export default function EditModal({user=User.blank().toJSON(), show, close}:EditModalProps) {
	return (
		<Modal show={show} close={close}>
			<Form
				properties={[
					{ name: 'name', label: 'Name', type: 'text', defaultValue:user.profile?.name },
					{ name: 'email', label: 'Email', type: 'email', defaultValue:user.email },
					{ name: 'password', label: 'Password', type: 'password', defaultValue:'' },
					{ name: 'description', label: 'Description', type: 'textarea', defaultValue:user.profile?.description },
					{ name: 'avatar', label: 'Avatar', type: 'url', defaultValue:user.profile?.avatar },
				]}
				actions={[
					{ label: 'Save', onClick: () => setIsOpen(false)},
					{ label: 'Cancel', onClick: () => setIsOpen(false)},
				]}
			/>
		</Modal>
	);
}
