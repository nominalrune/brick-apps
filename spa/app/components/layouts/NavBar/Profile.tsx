import User from '~/model/User/User';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import NavItem from './NavItem';
export default function Profile({ user, logout }: { user: User; logout:()=>unknown }) {
	return <Popover className="relative">
		<PopoverButton className="px-4 h-full hover:bg-slate-200 active:bg-slate-300 flex items-center gap-1 text-nowrap">
			<img src={user.profile?.avatar} className="size-6 aspect-square rounded" />
			{user.profile?.name}
		</PopoverButton>
		<PopoverPanel className="absolute rounded border border-slate-400 bg-slate-50 shadow">
			<NavItem to='/profile' >Profile</NavItem>
			<hr />
			<NavItem onClick={()=>logout()}>logout</NavItem>
		</PopoverPanel>
	</Popover>;
}