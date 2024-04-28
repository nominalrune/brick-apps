import AuthContextProvider from './Auth/AuthContextProvider';
export default function Contexts({ children }: { children: React.ReactNode; }) {
	return (
		<AuthContextProvider>
			{children}
		</AuthContextProvider>
	);
}
