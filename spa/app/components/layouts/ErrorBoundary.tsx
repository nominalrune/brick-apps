import { useEffect, useRef, useState } from 'react';

export default function ErrorBoundary({ children }: { children: React.ReactNode; }) {
	const [error, setError] = useState<Error | null>(null);
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handler = (event: ErrorEvent) => {
			setError(new Error(event.message));
		};
		ref.current?.addEventListener('error', handler);
		return () => {
			ref.current?.removeEventListener('error', handler);
		};
	}, []);
	if (error) {
		return <div>
			<h1>Error</h1>
			<p className='whitespace-pre bg-red-50 text-red-800'>{error.message}</p>
		</div>;
	}
	return <div ref={ref}>{children}</div>;
}