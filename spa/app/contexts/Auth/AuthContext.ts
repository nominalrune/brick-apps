import { createContext } from 'react';
import User from '~/model/User/User';
import UserData from '~/model/User/UserData';

interface IAuthContext {
	user: User | null;
	login: (auth:{email:string, password:string}, redirect?:string) => Promise<void>;
	logout: () => unknown;
}
/** 「変更前の月謝コレクション」コンテキスト */
const AuthContext = createContext<IAuthContext>({ user: null, login: () => Promise.resolve(), logout: () => {}});
export default AuthContext;
