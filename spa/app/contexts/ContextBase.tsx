import { Context } from 'react';

export default function ContextBase<T>({ children, context, value }: { children: React.ReactNode; context:Context<T>, value:T }) {
	return (
		<context.Provider value={value}>
			{children}
		</context.Provider>
	);
}