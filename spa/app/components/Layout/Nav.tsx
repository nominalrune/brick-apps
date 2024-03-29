import { NavLink } from '@remix-run/react';

export default function Nav() {
	return (
		<nav>
			<NavLink to="/">Home</NavLink>
			<NavLink to="/apps">Apps</NavLink>
		</nav>
	);
}
