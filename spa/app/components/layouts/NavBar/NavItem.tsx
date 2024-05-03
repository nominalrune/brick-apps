import { NavLink } from '@remix-run/react';

interface NavItemProps {
	to?: string;
	children: React.ReactNode;
	onClick?: () => unknown;
}

export default function NavItem({ to, children, onClick }: NavItemProps) {
	const base = <div onClick={onClick} className='flex justify-center items-center w-24 h-full hover:bg-slate-200 active:bg-slate-300'>
		{children}
	</div>;
	if (!!to) {
		return <NavLink to={to} className="h-full" >
			{base}
		</NavLink>;
	}
	return base;
}