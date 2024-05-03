import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
	children: React.ReactNode;
	show: boolean;
	close: () => void;
}

export default function Modal({ children, show, close }: ModalProps) {
	return (
		<Transition show={show} as={Fragment}>
			<Dialog onClose={close}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-100"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/30" />
				</Transition.Child>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Dialog.Panel>
						{children}
					</Dialog.Panel>
				</Transition.Child>
			</Dialog>
		</Transition>
	);
}

function Appear({ children, show }: { children: React.ReactNode; show: boolean; }) {
	return <Transition
		show={show}
		enter="transition duration-100 ease-out"
		enterFrom="transform scale-95 opacity-0"
		enterTo="transform scale-100 opacity-100"
		leave="transition duration-75 ease-out"
		leaveFrom="transform scale-100 opacity-100"
		leaveTo="transform scale-95 opacity-0"
		as={Fragment}
	>
		{children}
	</Transition>;

}