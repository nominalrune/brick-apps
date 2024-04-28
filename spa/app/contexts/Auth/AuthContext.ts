import { createContext } from 'react';
import User from '~/model/User';
import UserData from '~/model/UserData';

interface IAuthContext {
	user: User | null;
	login: (email:string, password:string) => Promise<void>;
}
/** 「変更前の月謝コレクション」コンテキスト */
const AuthContext = createContext<IAuthContext>({ user: null, login: () => Promise.resolve()});
export default AuthContext;
