import useAuth from '~/hooks/useAuth';
import AuthContext from './AuthContext';
import ContextBase from '../ContextBase';
/** 「変更前の月謝コレクション」を提供するコンテキスト
 *
 * RecordContextを必要としているので、RecordContextProviderよりも下に配置する
 */
export default function AuthContextProvider({ children }: { children: React.ReactNode; }) {
	const { user, login, logout } = useAuth();
	return <ContextBase context={AuthContext} value={{ user, login, logout }}>
		{children}
	</ContextBase>;
}
