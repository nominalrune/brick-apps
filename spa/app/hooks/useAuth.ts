import { useState, useContext } from 'react';
import useApi from './useApi';
import User from '~/model/User';

export default function useAuth() {
	const [user, setUser] = useState<User|null>(null);
	const api = useApi('http://localhost:8088');
	const login = async (email: string, password: string) => {
		const json = await api('/auth/login', 'POST', { email, password });
		setUser(User.fromData(json));
	};
	return { user, login };

}
