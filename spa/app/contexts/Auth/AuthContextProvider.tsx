import AuthContext from './AuthContext';
import useAuth from '~/hooks/useAuth';
/** 「変更前の月謝コレクション」を提供するコンテキスト
 *
 * RecordContextを必要としているので、RecordContextProviderよりも下に配置する
 */
export default function AuthContextProvider({ children }: { children: React.ReactNode; }) {
	const { user, login } = useAuth();
	return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>;
}
