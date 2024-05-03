import { NavLink } from '@remix-run/react';
import { useContext } from 'react';
import AuthContext from '~/contexts/Auth/AuthContext';
import NavItem from './NavItem';
import Profile from './Profile';

export default function NavBar() {
	const { user, logout } = useContext(AuthContext);
	return (
		<nav className='w-screen h-12 bg-slate-100 flex justify-between px-2'>
			<div className='flex'>
				<NavLink to={"/"} className='flex justify-center items-center h-full hover:bg-slate-200 active:bg-slate-300'>
					<img className='h-[95%]' src="/favicon.png" alt="home" />
				</NavLink>
				{user
					? <>
						<NavItem to='/apps' >apps</NavItem>
						<NavItem to='/users' >users</NavItem>
						<NavItem to='/groups'>groups</NavItem>
					</>
					: <></>
				}
			</div>
			<div className='flex items-center'>
				{user
					? <Profile user={user} logout={logout} />
					: <NavItem to='/auth/login' >login</NavItem>
				}
			</div>
		</nav>
	);
}
