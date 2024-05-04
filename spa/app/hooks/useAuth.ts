import { useState, useContext } from 'react';
import useApi from './useApi';
import User from '~/model/User/User';
import { useNavigate } from '@remix-run/react';

export default function useAuth() {
	const [user, setUser] = useState<User | null>(null);
	const api = useApi();
	const navigate = useNavigate();
	const login = async (auth: { email: string, password: string; }, redirect?: string) => {
		const json = await api('/auth/login', 'POST', auth);
		if (!json) return;
		setUser(User.fromData(json));
		if (redirect) {
			navigate(redirect);
		} else { navigate('/'); }
	};
	const logout = async (redirect?: string) => {
		await api('/auth/logout', 'GET');
		setUser(null);
		if (redirect) {
			navigate(redirect);
		} else { navigate('/auth/login'); }
	};
	return { user, login, logout };

}
