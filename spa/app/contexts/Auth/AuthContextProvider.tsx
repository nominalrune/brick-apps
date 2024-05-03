import useAuth from '~/hooks/useAuth';
import AuthContext from './AuthContext';
/** 「変更前の月謝コレクション」を提供するコンテキスト
 *
 * RecordContextを必要としているので、RecordContextProviderよりも下に配置する
 */
export default function AuthContextProvider({ children }: { children: React.ReactNode; }) {
	const { user, login, logout } = useAuth();
	return <AuthContext.Provider value={{ user, login, logout }}>
		{children}
		<details open className="w-1/2 m-2 p-2 bg-green-200 rounded absolute bottom-0 right-0">
			<summary>user:</summary>
			<pre className="bg-gray-50 rounded">
				{JSON.stringify(user, null, 2)}
			</pre>
		</details>
	</AuthContext.Provider>;
}
