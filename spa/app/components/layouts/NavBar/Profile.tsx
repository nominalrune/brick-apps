import User from '~/model/User';
import { Popover } from '@headlessui/react'
import NavItem from './NavItem';
export default function Profile({ user, logout }: { user: User; logout:()=>unknown }) {
	return <Popover className="relative">
		<Popover.Button className="w-24 h-full hover:bg-slate-200 active:bg-slate-300 inline-flex gap-1">
			<img src={user.profile?.avatar} className="size-6 aspect-square rounded" />
			{user.profile?.name}
		</Popover.Button>
		<Popover.Panel className="absolute rounded border border-slate-400 bg-slate-50 shadow">
			<NavItem to='/profile' >Profile</NavItem>
			<hr />
			<NavItem onClick={()=>logout()}>logout</NavItem>
		</Popover.Panel>
	</Popover>;
}