import { Link, NavLink, useLocation } from '@remix-run/react';
import { useContext } from 'react';
import AuthContext from '~/contexts/Auth/AuthContext';
import NavItem from './NavItem';
import Profile from './Profile';
import ignoreList from './ignoreList.json';

export default function NavBar() {
	const { user, logout } = useContext(AuthContext);
	return (
		<div className='flex flex-col'>
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
				{/* {title && <div className='absolute mx-auto text-2xl'>{title}</div>} */}
				<div className='flex items-center'>
					{user
						? <Profile user={user} logout={logout} />
						: <NavItem to='/auth/login' >login</NavItem>
					}
				</div>
			</nav>
			<BreadCrumbs />
		</div>
	);
}

function BreadCrumbs() {
	const url = useLocation().pathname;
	const parts = url.split('/').filter(i => !!i);
	return <nav className='pl-4 py-1 border-b text-slate-700 flex gap-2'>
		{
			parts.map((part, i) => {
				if (!ignoreList.includes(part)) { return <></>; }
				const path = parts.slice(0, i + 1).join('/');
				return <>{i !== 0 && ">"}<Link key={i} to={path}>{part}</Link></>;
			})
		}
	</nav>;
}