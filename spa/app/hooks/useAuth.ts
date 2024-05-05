import { useState, useContext, useEffect } from 'react';
import User from '~/model/User/User';
import { useNavigate } from '@remix-run/react';
import Api from '~/lib/api/Api';
import config from '~/config';

export default function useAuth() {
	const [user, setUser] = useState<User | null>(null);
	const api = new Api(config.baseUrl);
	const navigate = useNavigate();
	const login = async (auth: { email: string, password: string; }, redirect?: string) => {
		const json = await api.post('auth/login', auth);
		if (!json) return;
		setUser(User.fromData(json));
		if (redirect) {
			navigate(redirect);
		} else { navigate('/'); }
	};
	const logout = async (redirect?: string) => {
		await api.get('auth/logout');
		setUser(null);
		if (redirect) {
			navigate(redirect);
		} else { navigate('auth/login'); }
	};
	const check = async () => {
		const json = await api.get('auth');
		if (!json) return;
		setUser(User.fromData(json));
	}
	useEffect(()=>{
		check();
	},[])
	return { user, login, logout };

}
