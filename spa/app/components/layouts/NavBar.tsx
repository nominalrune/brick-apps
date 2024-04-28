import { NavLink } from '@remix-run/react';

export default function NavBar() {
	return (
		<nav className='w-screen h-12 bg-slate-100 flex justify-between'>
			<div className='flex'>

				<NavLink to={"/"} className='flex justify-center items-center h-full hover:bg-slate-200 active:bg-slate-300'>
					<img className='h-[95%]' src="/favicon.png" alt="home" />
				</NavLink>
				<NavItem to='/apps' label='apps' />
				<NavItem to='/users' label='users' />
				<NavItem to='/groups' label='groups' />
			</div>
			<div className='flex'>
				<NavItem to='/profile' label='profile' />
				<NavItem to='/auth/login' label='login' />
			</div>
		</nav>
	);
}


function NavItem({ to, label }: { to: string; label: React.ReactNode; }) {
	return (
		<NavLink to={to} className='flex justify-center items-center w-24 h-full hover:bg-slate-200 active:bg-slate-300'>
			{label}
		</NavLink>
	);
}
